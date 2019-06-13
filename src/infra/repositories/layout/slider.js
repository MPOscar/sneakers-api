const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutSlider, LayoutSlide } = require('src/domain/layout')

// Transforms layout_slider from domain to database object
const mapSlider = (layoutSliderDomain) => {
  return {
    sliderDisplay: layoutSliderDomain.display,
    sliderDisplayOnPage: Boolean(layoutSliderDomain.displayOnPage)
  }
}

const unmapSlider = (dbModel) => {
  const sliderDomain = Object.create(dbModel)
  sliderDomain.display = dbModel.sliderDisplay ? dbModel.sliderDisplay : 'top'
  sliderDomain.displayOnPage = Boolean(parseInt(dbModel.sliderDisplayOnPage))
  return LayoutSlider(sliderDomain)
}

module.exports = (database) => {
  const model = database.models.layouts
  const layoutSlidesModel = database.models.layout_slides
  const getSlider = async (page) => {
    let layoutDb = await model.findOne({
      where: { page: page },
      include: { model: layoutSlidesModel, as: 'slides' }
    })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    return unmapSlider(layoutDb)
  }

  const updateSlider = async (page, slider) => {
    // set filter as string
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let sliderDbAttrs = mapSlider(slider)
    await layoutDb.updateAttributes(sliderDbAttrs)
    if (slider.slides) {
      // create and set slider images
      const slidesDomain = slider.slides.map((slide) => {
        return LayoutSlide(slide)
      })
      const newSlides = await layoutSlidesModel.bulkCreate(slidesDomain)
      await layoutDb.setSlides(newSlides)
    }
    return slider
  }

  return {
    getSlider,
    updateSlider
  }
}

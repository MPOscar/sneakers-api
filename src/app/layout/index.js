const getLayoutUseCase = require('./get_layout')
const setLayoutUseCase = require('./set_layout')
const setLayoutSliderUseCase = require('./set_layout_slider')
const getLayoutSliderUseCase = require('./get_layout_slider')
const setLayoutHeadingUseCase = require('./set_layout_heading')
const getLayoutHeadingUseCase = require('./get_layout_heading')
const setLayoutHeaderUseCase = require('./set_layout_header')
const getLayoutHeaderUseCase = require('./get_layout_header')
const createOurPartnersTabUseCase = require('./create_layout_ourpartners_tab')
const updateOurPartnersTabUseCase = require('./update_layout_ourpartners_tab')
const deleteOurPartnersTabUseCase = require('./delete_layout_ourpartners_tab')

module.exports = {
  getLayoutUseCase,
  setLayoutUseCase,
  setLayoutSliderUseCase,
  getLayoutSliderUseCase,
  setLayoutHeadingUseCase,
  getLayoutHeadingUseCase,
  setLayoutHeaderUseCase,
  getLayoutHeaderUseCase,
  createOurPartnersTabUseCase,
  updateOurPartnersTabUseCase,
  deleteOurPartnersTabUseCase
}

const mailService = require('src/infra/mail')
const sender = 'jccastrillon@solutiondeveloppeur.fr'
const receiver = 'jccastrillon@solutiondeveloppeur.fr'

const sendEmailUseCase = (content) => {
  let contentText = 'Name: ' + content.name + '\nEmail: ' + content.email + '\nSubject: ' + content.subject + '\nDescription: ' + content.description
  return mailService.sendMail(sender, receiver, contentText)
}

module.exports = {
  sendEmailUseCase
}

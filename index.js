let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: null 
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 10, 15),
    dataCheckIn: new Date(2024, 2, 25, 18, 30)
  },
  {
    nome: "Lucas Santos",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 14, 45),
    dataCheckIn: new Date(2024, 2, 25, 21, 10)
  },
  {
    nome: "Camila Oliveira",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 9, 30),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Silva",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 18, 0),
    dataCheckIn: new Date(2024, 2, 25, 21, 45)
  },
  {
    nome: "Fernando Oliveira",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 16, 10),
    dataCheckIn: new Date(2024, 2, 25, 20, 5)
  },
  {
    nome: "Paula Mendes",
    email: "paula@gmail.com",
    dataInscricao: new Date(2024, 2, 12, 11, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 30)
  },
  {
    nome: "Gustavo Almeida",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 13, 35),
    dataCheckIn: null
  },
  {
    nome: "Amanda Costa",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 17, 55),
    dataCheckIn: new Date(2024, 2, 25, 21, 55)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to (participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to (participante.dataCheckIn)
  
if(participante.dataCheckIn == null) {
  dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
     >
       Confirmar check-in
     </button>
  `
}

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
       </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarlista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
   output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find((p) =>  p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  } 
  
  const participante = participantes.find((p) => p.email == event.target.dataset.email  
  )

  participante.dataCheckIn = new Date()

  atualizarlista(participantes)
}
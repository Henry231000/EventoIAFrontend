import competitionVideo from '../../Images/competencia_matematica.mp4'
import competitionPoster from '../../Images/competencia_matematica-poster.jpg'
import celloImage from '../../Images/cello.png'
import kaiImage from '../../Images/kai.png'
import gastonImage from '../../Images/gaston.png'
import scissorsImage from '../../Images/tijeras.png'
import esanImage from '../../Images/esan.png'
import instagramIcon from '../../Images/insta.png'
import facebookIcon from '../../Images/facebook.png'
import tiktokIcon from '../../Images/tiktok.png'
import loginImage from '../../Images/Imagen_login.png'

export { loginImage }

export const eventCategories = [
  'Conciertos',
  'Conferencias',
  'Competencias',
  'Entretenimiento',
  'Deporte',
  'Otros',
  'Todos',
]

// Las secciones reciben estos datos por props; podrán sustituirse por datos de una API.
export const featuredEvent = {
  category: 'COMPETENCIA',
  title: 'MATEMÁTICA',
  subtitle: 'Cuántica',
  description:
    'Dos continentes, un mismo desafío. América y Asia se enfrentan en una épica competencia de matemática cuántica, donde la lógica, la inteligencia y la innovación desafían los límites del conocimiento.',
  video: competitionVideo,
  poster: competitionPoster,
}

export const featuredGuests = [
  {
    id: 'chelista',
    name: 'Anastasia Kobekina',
    description: 'Concierto',
    image: celloImage,
    alt: 'Chelista junto a su violonchelo',
    position: 'center 38%',
  },
  {
    id: 'kai-fu-lee',
    name: 'Kai-Fu Lee',
    description: 'Conferencia IA',
    image: kaiImage,
    alt: 'Retrato de Kai-Fu Lee',
    position: 'center 35%',
  },
  {
    id: 'gaston-acurio',
    name: 'Gastón Acurio',
    description: 'Conferencia Tierra y Sabor',
    image: gastonImage,
    alt: 'Gastón Acurio en la cocina de un restaurante',
    position: 'center 38%',
  },
]

export const highlightedEvents = [
  {
    id: 'danzantes-tijeras',
    image: scissorsImage,
    alt: 'Encuentro de danzantes de tijeras y bailarines de breakdance en el escenario',
    title: 'Danzantes de tijeras vs b-boys',
    description:
      'Dos culturas, dos estilos y un mismo escenario. La fuerza ancestral de los Andes se enfrenta a la energía del breakdance urbano en un espectáculo donde la tradición y la modernidad desafían los límites del movimiento.',
    city: 'Lima',
    dates: [
      { day: 'Viernes', date: '18 Dic.' },
      { day: 'Sábado', date: '19 Dic.' },
      { day: 'Domingo', date: '20 Dic.' },
    ],
  },
  {
    id: 'open-day-esan',
    image: esanImage,
    alt: 'Presentación ante el público en el auditorio de ESAN',
    title: 'OPEN DAY ESAN',
    description:
      'Una experiencia para descubrir nuevas oportunidades académicas, explorar carreras profesionales y conocer de cerca la vida universitaria. Un espacio de inspiración, innovación y aprendizaje para quienes buscan construir su futuro.',
    city: 'Lima',
    dates: [
      { day: 'Miércoles', date: '27 Ene.' },
      { day: 'Jueves', date: '28 Ene.' },
      { day: 'Viernes', date: '29 Ene.' },
    ],
  },
]

export const footerGroups = [
  {
    title: 'CONOZCÁMONOS',
    links: [
      'Acerca de nosotros',
      'Términos y condiciones',
      'Revisa tu factura o boleta',
      'Código de ética',
    ],
  },
  {
    title: '¡TRABAJEMOS JUNTOS!',
    links: ['¿Tienes un evento?', 'Venta empresas', 'Módulo promotores'],
  },
]

export const socialLinks = [
  { name: 'Instagram', image: instagramIcon },
  { name: 'Facebook', image: facebookIcon },
  { name: 'TikTok', image: tiktokIcon },
]

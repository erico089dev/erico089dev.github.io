// Flujos reales de ACG, extraídos de orchestrator/flows/flows_metadata.yaml.
// Cada flujo es un pipeline con pasos tipados. Sirve para el explorador visual del deep-dive.
// Nota: el texto va en español (como los nombres de flujo y los diagramas); no se traduce en EN/CAT.

export type StepType = 'source' | 'prompt' | 'process' | 'service' | 'publish';

export interface FlowStep {
  name: string;
  type: StepType;
  desc: string; // qué hace este paso (se muestra al lado del slider)
}

export interface AcgFlow {
  id: string;
  name: string;
  description: string;
  automation: 'auto' | 'semi';
  steps: FlowStep[];
}

export const acgFlows: AcgFlow[] = [
  {
    id: 'reddit_video',
    name: 'Reddit Video',
    description: 'Scrapea Reddit y genera un vídeo de conversación estilo Family Guy.',
    automation: 'auto',
    steps: [
      { name: 'Scrape Reddit', type: 'source', desc: 'Rastrea subreddits y baja los hilos que están petando.' },
      { name: 'Preference Post', type: 'prompt', desc: 'La IA elige qué hilo encaja mejor con el canal.' },
      { name: 'Scan Post', type: 'process', desc: 'Lee el hilo y extrae comentarios, datos y debate.' },
      { name: 'Thread Refiner', type: 'prompt', desc: 'Ordena todo en una historia con principio y final.' },
      { name: 'Script Generator', type: 'prompt', desc: 'Convierte la historia en un guion con diálogo.' },
      { name: 'Script Refiner', type: 'prompt', desc: 'Pule el guion: ritmo, tono y gancho inicial.' },
      { name: 'Image Script', type: 'prompt', desc: 'Decide qué imágenes acompañan cada línea.' },
      { name: 'Build Video', type: 'service', desc: 'Monta el vídeo: fondo, personajes, subtítulos y voz clonada.' },
      { name: 'Caption', type: 'prompt', desc: 'Escribe el copy del post para redes.' },
      { name: 'YouTube Desc', type: 'prompt', desc: 'Genera título y descripción para YouTube.' },
      { name: 'Thumbnail', type: 'prompt', desc: 'Crea la miniatura del vídeo.' },
      { name: 'Publicar', type: 'publish', desc: 'Sube el Reel a Instagram, TikTok y YouTube.' },
    ],
  },
  {
    id: 'reddit_topic',
    name: 'Reddit Topic',
    description: 'Investiga un tema con Gemini + búsqueda web y monta el vídeo.',
    automation: 'auto',
    steps: [
      { name: 'Pick Topic', type: 'prompt', desc: 'Elige un tema interesante para el vídeo.' },
      { name: 'Web Search', type: 'process', desc: 'Investiga el tema con Gemini y búsqueda web.' },
      { name: 'Script Builder', type: 'prompt', desc: 'Redacta el guion a partir de lo investigado.' },
      { name: 'Image Script', type: 'prompt', desc: 'Define las imágenes de cada parte.' },
      { name: 'Build Video', type: 'service', desc: 'Monta el vídeo con voz y subtítulos.' },
      { name: 'Caption', type: 'prompt', desc: 'Escribe el copy del post.' },
      { name: 'Thumbnail', type: 'prompt', desc: 'Genera la miniatura.' },
      { name: 'Publicar', type: 'publish', desc: 'Publica en las plataformas.' },
    ],
  },
  {
    id: 'reddit_idea',
    name: 'Reddit Idea',
    description: 'Genera vídeos a partir de ideas guardadas a mano en la base de datos.',
    automation: 'auto',
    steps: [
      { name: 'Pick Idea', type: 'source', desc: 'Coge una idea guardada a mano en la base de datos.' },
      { name: 'Script Generator', type: 'prompt', desc: 'Convierte la idea en un guion.' },
      { name: 'Script Refiner', type: 'prompt', desc: 'Pule el guion.' },
      { name: 'Image Script', type: 'prompt', desc: 'Define las imágenes del vídeo.' },
      { name: 'Build Video', type: 'service', desc: 'Monta el vídeo con voz y subtítulos.' },
      { name: 'Caption', type: 'prompt', desc: 'Escribe el copy del post.' },
      { name: 'Thumbnail', type: 'prompt', desc: 'Crea la miniatura.' },
      { name: 'Publicar', type: 'publish', desc: 'Publica en las plataformas.' },
    ],
  },
  {
    id: 'spacy_vibes_reel',
    name: 'Spacy Vibes · Reel',
    description: 'Reels virales de psicología de pareja con una pregunta gancho.',
    automation: 'auto',
    steps: [
      { name: 'Pick Category', type: 'source', desc: 'Elige una categoría de psicología de pareja.' },
      { name: 'Reel Generator', type: 'prompt', desc: 'Genera el Reel a partir de una pregunta gancho.' },
      { name: 'Build Reel', type: 'service', desc: 'Monta el Reel final con su diseño.' },
      { name: 'Publicar', type: 'publish', desc: 'Lo publica en las plataformas.' },
    ],
  },
  {
    id: 'spacy_vibes_carousel',
    name: 'Spacy Vibes · Carousel',
    description: 'Carousels virales con varias preguntas gancho.',
    automation: 'auto',
    steps: [
      { name: 'Pick Category', type: 'source', desc: 'Elige la categoría del carrusel.' },
      { name: 'Carousel Generator', type: 'prompt', desc: 'Genera varias preguntas gancho.' },
      { name: 'Build Carousel', type: 'service', desc: 'Monta el carrusel de imágenes.' },
      { name: 'Publicar', type: 'publish', desc: 'Lo publica en las plataformas.' },
    ],
  },
  {
    id: 'folklore_video',
    name: 'Folklore Video',
    description: 'Leyendas y mitos de Wikipedia con imágenes generadas por ComfyUI (SD 1.5).',
    automation: 'auto',
    steps: [
      { name: 'Auto-Scrape Wikipedia', type: 'source', desc: 'Rastrea Wikipedia en busca de leyendas y mitos.' },
      { name: 'Pick Story', type: 'source', desc: 'Selecciona la historia a contar.' },
      { name: 'Fetch Wikipedia', type: 'process', desc: 'Descarga el texto completo del artículo.' },
      { name: 'Story Core', type: 'prompt', desc: 'Extrae el núcleo narrativo de la leyenda.' },
      { name: 'Narration', type: 'prompt', desc: 'Escribe la narración del vídeo.' },
      { name: 'Scenes', type: 'prompt', desc: 'Divide la narración en escenas visuales.' },
      { name: 'ComfyUI Generation', type: 'service', desc: 'Genera las imágenes con ComfyUI (SD 1.5).' },
    ],
  },
  {
    id: 'lovely_people',
    name: 'Lovely People',
    description: 'Comenta con ironía vídeos de altercados de Reddit (con review manual).',
    automation: 'semi',
    steps: [
      { name: 'Pick Video', type: 'source', desc: 'Elige un vídeo de altercado de Reddit.' },
      { name: 'Ironic Script', type: 'prompt', desc: 'Escribe un comentario irónico sobre el vídeo.' },
      { name: 'Build Video', type: 'service', desc: 'Monta el vídeo comentado.' },
      { name: 'Caption', type: 'prompt', desc: 'Escribe el copy del post.' },
      { name: 'Publicar', type: 'publish', desc: 'Publica tras tu review manual.' },
    ],
  },
  {
    id: 'choose_one',
    name: 'Choose One',
    description: "Vídeos tipo 'elige uno' con bloques de decisión.",
    automation: 'auto',
    steps: [
      { name: 'Choose One', type: 'prompt', desc: "Genera un vídeo tipo 'elige uno' con opciones." },
      { name: 'Build Video', type: 'service', desc: 'Monta el vídeo con los bloques de decisión.' },
      { name: 'Thumbnail', type: 'process', desc: 'Prepara la miniatura.' },
      { name: 'Publicar', type: 'publish', desc: 'Lo publica en las plataformas.' },
    ],
  },
];

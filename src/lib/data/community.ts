export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: {
    registered: number;
    total: number;
  };
  category: 'Torneo' | 'Clínica' | 'Social' | 'Liga';
  status: 'Inscripciones Abiertas' | 'Pocos Lugares' | 'Completo' | 'Próximamente';
  description: string;
  price?: number;
  organizer: string;
  image: string;
}

export interface Club {
  id: number;
  name: string;
  location: string;
  courts: number;
  members: number;
  rating: number;
  image: string;
  amenities: string[];
  schedule: {
    weekday: string;
    weekend: string;
  };
  prices: {
    hourly: number;
    monthly?: number;
  };
  contact: {
    phone: string;
    email: string;
  };
}

export const communityEvents: Event[] = [
  {
    id: 1,
    title: 'Torneo Nacional Amateur',
    date: '15 Abril, 2024',
    time: '09:00 AM',
    location: 'Club de Padel Cuernavaca',
    participants: {
      registered: 24,
      total: 32,
    },
    category: 'Torneo',
    status: 'Inscripciones Abiertas',
    description: 'Torneo nacional para jugadores amateur con premios en efectivo y patrocinios.',
    price: 1500,
    organizer: 'Federación Mexicana de Padel',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
  },
  {
    id: 2,
    title: 'Clínica con Pro Players',
    date: '20 Abril, 2024',
    time: '10:00 AM',
    location: 'Padel Center Morelos',
    participants: {
      registered: 14,
      total: 16,
    },
    category: 'Clínica',
    status: 'Pocos Lugares',
    description: 'Aprende de los mejores jugadores profesionales en esta clínica intensiva.',
    price: 800,
    organizer: 'Academia Pro Padel',
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd5c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Liga Local Primavera',
    date: '1 Mayo - 30 Junio, 2024',
    time: 'Varios horarios',
    location: 'Múltiples sedes',
    participants: {
      registered: 48,
      total: 64,
    },
    category: 'Liga',
    status: 'Inscripciones Abiertas',
    description: 'Liga local con partidos semanales y sistema de clasificación.',
    price: 2500,
    organizer: 'Liga Mexicana de Padel',
    image: 'https://images.unsplash.com/photo-1591491653056-4028bd769982?w=800&q=80',
  },
];

export const clubs: Club[] = [
  {
    id: 1,
    name: 'Club de Padel Cuernavaca',
    location: 'Cuernavaca, Morelos',
    courts: 6,
    members: 250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop',
    amenities: [
      'Estacionamiento',
      'Vestidores',
      'Cafetería',
      'Pro Shop',
      'Iluminación LED',
    ],
    schedule: {
      weekday: '7:00 AM - 10:00 PM',
      weekend: '8:00 AM - 8:00 PM',
    },
    prices: {
      hourly: 400,
      monthly: 1500,
    },
    contact: {
      phone: '+52 777 123 4567',
      email: 'info@padelcuernavaca.mx',
    },
  },
  {
    id: 2,
    name: 'Padel Center Morelos',
    location: 'Cuernavaca, Morelos',
    courts: 4,
    members: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd5c?w=400&h=300&fit=crop',
    amenities: [
      'Estacionamiento',
      'Vestidores',
      'Tienda',
      'Área de calentamiento',
    ],
    schedule: {
      weekday: '6:00 AM - 11:00 PM',
      weekend: '7:00 AM - 9:00 PM',
    },
    prices: {
      hourly: 350,
    },
    contact: {
      phone: '+52 777 987 6543',
      email: 'contacto@padelcenter.mx',
    },
  },
];

export function useEvents() {
  const joinEvent = (eventId: number) => {
    // Here you would typically make an API call to join the event
    const event = communityEvents.find(e => e.id === eventId);
    if (!event) return false;
    
    // For demo purposes, we'll just return true
    return true;
  };

  const registerForClass = (eventId: number) => {
    const event = communityEvents.find(e => e.id === eventId);
    if (!event) return false;
    
    return true;
  };

  const joinLeague = (eventId: number) => {
    const event = communityEvents.find(e => e.id === eventId);
    if (!event) return false;
    
    return true;
  };

  return {
    events: communityEvents,
    joinEvent,
    registerForClass,
    joinLeague,
  };
}

export function useClubs() {
  const bookCourt = (clubId: number, date: string, time: string) => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return false;
    
    return true;
  };

  const joinClub = (clubId: number) => {
    const club = clubs.find(c => c.id === clubId);
    if (!club) return false;
    
    return true;
  };

  return {
    clubs,
    bookCourt,
    joinClub,
  };
}
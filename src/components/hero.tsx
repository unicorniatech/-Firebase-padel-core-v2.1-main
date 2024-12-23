import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Star, Crown, Play } from 'lucide-react';
import { useGsapHeroAnimation } from '@/hooks/use-gsap';
import { CTAModal } from './cta-modal';
import { useAuth } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const galleryItems = [
  {
    type: 'player',
    title: 'Carlos Ramírez',
    subtitle: 'Ranking #1',
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd5c?w=1200&q=80',
    highlight: 'Campeón Nacional 2023',
  },
  {
    type: 'match',
    title: 'Final Nacional',
    subtitle: 'Highlights',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80',
    video: true,
  },
  {
    type: 'player',
    title: 'Ana González',
    subtitle: 'Ranking #2',
    image: 'https://images.unsplash.com/photo-1587385789097-0197a7fbd179?w=1200&q=80',
    highlight: '12 Títulos Nacionales',
  },
  {
    type: 'sponsor',
    title: 'Equipamiento Profesional',
    subtitle: 'Nueva Colección 2024',
    image: 'https://images.unsplash.com/photo-1591491653056-4028bd769982?w=1200&q=80',
    sponsored: true,
  },
  {
    type: 'match',
    title: 'Torneo Verano',
    subtitle: 'Mejores Momentos',
    image: 'https://images.unsplash.com/photo-1599474924389-57b9c5d7c6d5?w=1200&q=80',
    video: true,
  },
];

export function Hero() {
  const containerRef = useGsapHeroAnimation();
  const { user } = useAuth();
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCTAClick = () => {
    if (!user) {
      setShowCTAModal(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center" ref={containerRef}>
      {/* Dynamic Background Gallery */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={galleryItems[currentSlide].image}
              alt={galleryItems[currentSlide].title}
              className="w-full h-full object-cover brightness-[0.3]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </motion.div>
        </AnimatePresence>

        {/* Gallery Indicators */}
        <div className="absolute bottom-8 right-8 flex items-center gap-4 z-20">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSlide === index 
                  ? "bg-primary w-8" 
                  : "bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>

        {/* Current Slide Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute bottom-8 left-8 text-white z-20"
        >
          <div className="flex items-center gap-2">
            {galleryItems[currentSlide].video && (
              <div className="flex items-center gap-2 text-primary">
                <Play className="h-4 w-4" />
                <span className="text-sm font-medium">En Reproducción</span>
              </div>
            )}
            {galleryItems[currentSlide].sponsored && (
              <div className="flex items-center gap-2 text-primary">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">Patrocinado</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold mt-2">{galleryItems[currentSlide].title}</h3>
          <p className="text-sm text-white/80">{galleryItems[currentSlide].subtitle}</p>
          {galleryItems[currentSlide].highlight && (
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm">{galleryItems[currentSlide].highlight}</span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Crown className="h-5 w-5" />
              <span>La plataforma líder de padel en México</span>
            </div>

            <h1 className="text-6xl font-bold tracking-tight hero-title">
              Eleva Tu{' '}
              <span className="text-primary">Juego de Padel</span>{' '}
              al Siguiente Nivel
            </h1>

            <p className="text-xl text-muted-foreground hero-description max-w-2xl">
              Únete a la comunidad más grande de padel en México. Compite en torneos,
              mejora tu ranking y conéctate con jugadores de tu nivel.
            </p>

            <div className="flex flex-wrap gap-4 hero-buttons">
              <Link to={ROUTES.PRICING}>
                <Button size="lg" className="text-lg px-8">
                  <Crown className="h-5 w-5 mr-2" />
                  Prueba Platino Gratis
                </Button>
              </Link>
              <Link to={ROUTES.RANKINGS}>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explorar Rankings
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">150+</h3>
                  <p className="text-muted-foreground">Torneos al año</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">10K+</h3>
                  <p className="text-muted-foreground">Jugadores activos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-2xl font-bold">4.9/5</h3>
                  <p className="text-muted-foreground">Calificación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTAModal open={showCTAModal} onOpenChange={setShowCTAModal} />
    </div>
  );
}
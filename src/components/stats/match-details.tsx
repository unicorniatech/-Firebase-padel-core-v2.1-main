import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Video, MessageSquare, Hash, Camera, Trophy } from 'lucide-react';

interface MatchDetailsProps {
  match: any;
}

export function MatchDetails({ match }: MatchDetailsProps) {
  if (!match) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{match.tournament}</h3>
            <Badge variant={match.status === 'victoria' ? 'success' : 'destructive'}>
              {match.status === 'victoria' ? 'Victoria' : 'Derrota'}
            </Badge>
          </div>
          <p className="text-2xl font-bold">{match.result}</p>
          <p className="text-sm text-muted-foreground mt-2">{match.date}</p>
        </Card>

        <Card className="p-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Puntos Ganados</p>
              <p className="text-2xl font-bold text-primary">+25</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="text-2xl font-bold">1h 45m</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="videos">
        <TabsList>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="photos">
            <Camera className="h-4 w-4 mr-2" />
            Fotos
          </TabsTrigger>
          <TabsTrigger value="stats">
            <Trophy className="h-4 w-4 mr-2" />
            Estadísticas
          </TabsTrigger>
          <TabsTrigger value="social">
            <Hash className="h-4 w-4 mr-2" />
            Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((video) => (
                <div key={video} className="aspect-video bg-muted rounded-lg relative cursor-pointer hover:opacity-80 transition-opacity">
                  <Video className="absolute inset-0 m-auto h-8 w-8 text-muted-foreground" />
                  <div className="absolute bottom-2 left-2">
                    <p className="text-sm font-medium">Highlight {video}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((photo) => (
                <div key={photo} className="aspect-square bg-muted rounded-lg" />
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Puntos Ganadores</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Smashes</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voleas</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bandejas</span>
                    <span className="font-medium">6</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Errores</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>No Forzados</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dobles Faltas</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Eficiencia</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Primer Servicio</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Puntos Ganados</span>
                    <span className="font-medium">56%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="p-6">
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((post) => (
                  <Card key={post} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Usuario {post}</p>
                          <Badge variant="secondary">
                            #{match.tournament.replace(/\s+/g, '')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          ¡Gran partido! Increíbles jugadas 🎾🔥
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <MessageSquare className="h-4 w-4" />
                            <span>Responder</span>
                          </button>
                          <span>2h</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
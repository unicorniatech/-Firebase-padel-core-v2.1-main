import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Activity,
  Trophy,
  Calendar,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Bell,
  MapPin,
  DollarSign,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createUsuario, createTorneo,createPartido,fetchTorneos, fetchUsuarios } from '@/lib/api';
import { Partido } from '@/lib/types';


interface PendingApproval {
  id: string;
  type: 'ranking' | 'match' | 'tournament';
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}
// Define la interfaz para describir los datos de un torneo
interface Torneo {
  id: string; // Cambia a 'number' si el backend usa IDs numéricos
  nombre: string; // El nombre del torneo
}



export function AdminDashboard() {
  const { toast } = useToast();
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    {
      id: '1',
      type: 'ranking',
      title: 'Actualización de Ranking',
      description: 'Carlos Ramírez sube al puesto #3 (+2)',
      status: 'pending',
      timestamp: '12:30 PM',
    },
    {
      id: '2',
      type: 'match',
      title: 'Resultado de Partido',
      description: 'Final Torneo Nacional: C.Ramírez/A.González vs M.Torres/L.Hernández (6-4, 7-5)',
      status: 'pending',
      timestamp: '11:45 AM',
    },
    {
      id: '3',
      type: 'tournament',
      title: 'Nuevo Torneo',
      description: 'Torneo Verano 2024 - Club Elite (25-30 Junio)',
      status: 'pending',
      timestamp: '10:15 AM',
    },
  ]);
  // Estado para manejar los datos del formulario de "Registrar Jugador"
  const [playerData, setPlayerData] = useState({
    nombre_completo: '',
    email: '',
    rating_inicial: '',
    club: '',
  });
  // Estado para manejar los datos del formulario de "Registrar Torneo"
  const [torneoData, setTorneoData] = useState({
    nombre: '',
    sede: '',
    fecha_inicio: '',
    fecha_fin: '',
    premio_dinero: '',
    puntos:'',
    imagen_url:'',
    tags: [''],
});
 // Estado para manejar los datos del formulario de "Registrar Partido"
 const [partidoData, setPartidoData] = useState<Partido>({
  equipo_1: [], // IDs de los jugadores seleccionados para el equipo 1
  equipo_2: [], // IDs de los jugadores seleccionados para el equipo 2
  fecha: '',
  hora: '',
  resultado: '',
  torneo: '', // ID del torneo seleccionado
});

const [usuarios, setUsuarios] = useState([]); // Lista de usuarios registrados

useEffect(() => {
    const loadUsuarios = async () => {
        try {
            const data = await fetchUsuarios();
            setUsuarios(data); // Almacena los usuarios en el estado
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };
    loadUsuarios();
}, []); // Solo al montar el componente

// Estado para manejar la lista de torneos
const [torneos, setTorneos] = useState<Torneo[]>([]); // Estado para manejar la lista de torneos
//useEffect para cargar los torneos al montar el componente
useEffect(() => {
  const loadTorneos = async () => {
      try {
          const data = await fetchTorneos(); // Llama a la API para obtener los torneos
          setTorneos(data); // Actualiza el estado con la lista de torneos
      } catch (error) {
          console.error('Error al cargar torneos:', error);
      }
  };
  loadTorneos();
}, []); // Solo se ejecuta una vez al montar el componente



  // Función para manejar cambios en los inputs del formulario (jugador)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };
  // Función para manejar los cambios de los torneos
  const handleTorneoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTorneoData({ ...torneoData, [name]: value });
};
  const handleMatchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'equipo_1' || name === 'equipo_2') {
      const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions).map((option) => option.value);
      setPartidoData((prev) => ({ ...prev, [name]: selectedOptions }));
      return;
    }
  
    // Caso especial para fecha y hora (actualiza fecha_hora)
    if (name === 'fecha') {
      setPartidoData((prev) => ({
        ...prev,
        fecha_hora: `${value}T${prev.fecha_hora.split('T')[1] || '00:00:00'}`,
      }));
      return;
    }
  
    if (name === 'hora') {
      setPartidoData((prev) => ({
        ...prev,
        fecha_hora: `${prev.fecha_hora.split('T')[0] || '1970-01-01'}T${value}`,
      }));
      return;
    }
  
    // Manejo general para otros campos
    setPartidoData((prev) => ({ ...prev, [name]: value }));
  };


    // Función para registrar un nuevo jugador
    const handleRegisterPlayer = async () => {
      try {
        const jugador = {
          ...playerData,
          rating_inicial: parseFloat(playerData.rating_inicial), // Convierte el rating a número
        };
        const response = await createUsuario(jugador); // Envía los datos al backend
        console.log('Jugador registrado:', response);
        toast({
          title: 'Jugador registrado con éxito',
          description: 'El jugador ha sido agregado correctamente.',
        });
        // Limpia el formulario
        setPlayerData({
          nombre_completo: '',
          email: '',
          rating_inicial: '',
          club: '',
        });
      } catch (error) {
        console.error('Error al registrar jugador:', error);
        toast({
          title: 'Error al registrar jugador',
          description: 'Hubo un problema al registrar al jugador. Intenta nuevamente.',
          variant: 'destructive',
        });
      }
    };
    //Función para registrar nuevo torneo
    const handleRegisterTorneo = async () => {
      console.log("handleRegisterTorneo se ejecuta"); 
      try {
        //Para validar que una URL sea válida
        
        const torneo = {
             ...torneoData,
             premio_dinero: parseFloat(torneoData.premio_dinero), // Convertir el premio a número
             puntos: parseInt(torneoData.puntos, 10),
         };
         const response = await createTorneo(torneo); // Llamar a la API
         console.log('Torneo registrado:', response);
         toast({
             title: 'Torneo registrado con éxito',
             description: 'El torneo ha sido agregado correctamente.',
         });
         // Limpiar el formulario
         setTorneoData({
             nombre: '',
             sede: '',
             fecha_inicio: '',
             fecha_fin: '',
             premio_dinero: '',
             puntos: '',
             imagen_url: '',
             tags: [''],
         });
      } catch (error) {
          console.error('Error al registrar torneo:', error);
          toast({
              title: 'Error al registrar torneo',
              description: 'Hubo un problema al registrar el torneo. Intenta nuevamente.',
              variant: 'destructive',
        });
      }
    };
    //Función para registrar nuevo Partido
    const handleRegisterMatch = async () => {
      try {
        const partido = {
          equipo_1: partidoData.equipo_1, // Array de IDs de jugadores del equipo 1
          equipo_2: partidoData.equipo_2, // Array de IDs de jugadores del equipo 2
          fecha: partidoData.fecha_hora.split('T')[0], // Extrae solo la fecha
          hora: partidoData.fecha_hora.split('T')[1], // Extrae solo la hora
          resultado: partidoData.resultado,
          torneo: partidoData.torneo,
        };
    
        console.log('Datos enviados al backend:', partido);
    
        const response = await createPartido(partido); // Llama a la API
        console.log('Partido registrado:', response);
    
        toast({
          title: 'Partido registrado con éxito',
          description: 'El partido ha sido agregado correctamente.',
        });
    
        // Limpia el formulario
        setPartidoData({
          equipo_1: [],
          equipo_2: [],
          fecha_hora: '',
          resultado: '',
          torneo: '',
        });
      } catch (error) {
        console.error('Error al registrar partido:', error);
        toast({
          title: 'Error al registrar partido',
          description: 'Hubo un problema al registrar el partido. Intenta nuevamente.',
          variant: 'destructive',
        });
      }
    };
    
  
  
  const handleApproval = (id: string, approved: boolean) => {
    setPendingApprovals(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: approved ? 'approved' : 'rejected' }
          : item
      )
    );

    toast({
      title: approved ? "Aprobado" : "Rechazado",
      description: `La solicitud ha sido ${approved ? 'aprobada' : 'rechazada'} exitosamente.`,
      duration: 3000,
    });
  };

  const stats = [
    { label: 'Usuarios Activos', value: '156', icon: Users },
    { label: 'Partidos Hoy', value: '12', icon: Activity },
    { label: 'Torneos Activos', value: '3', icon: Trophy },
    { label: 'Eventos Próximos', value: '8', icon: Calendar },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          <Input
            placeholder="Buscar..."
            className="max-w-xs"
            icon={Search}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Registro
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Registro</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="match" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="match">Partido</TabsTrigger>
                  <TabsTrigger value="tournament">Torneo</TabsTrigger>
                  <TabsTrigger value="player">Jugador</TabsTrigger>
                </TabsList>
                <TabsContent value="match" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Selección del Torneo */}
                    <div className="space-y-2">
                      <Label>Torneo</Label>
                      <select
                        name="torneo"
                        value={partidoData.torneo}
                        onChange={handleMatchChange}
                        className="border rounded px-3 py-2 w-full"
                      >
                        <option value="">Selecciona un Torneo</option>
                        {torneos.map((torneo) => (
                          <option key={torneo.id} value={torneo.id}>
                            {torneo.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Jugadores Equipo 1 */}
                    <div className="space-y-2">
                      <Label>Jugadores Equipo 1</Label>
                      <select
                        name="equipo_1"
                        multiple
                        value={partidoData.equipo_1}
                        onChange={handleMatchChange}
                        className="border rounded px-3 py-2 w-full"
                      >
                        {usuarios.map((usuario) => (
                          <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre_completo}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Jugadores Equipo 2 */}
                    <div className="space-y-2">
                      <Label>Jugadores Equipo 2</Label>
                      <select
                        name="equipo_2"
                        multiple
                        value={partidoData.equipo_2}
                        onChange={handleMatchChange}
                        className="border rounded px-3 py-2 w-full"
                      >
                        {usuarios.map((usuario) => (
                          <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre_completo}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Fecha */}
                    <div className="space-y-2">
                      <Label>Fecha</Label>
                      <Input
                        name="fecha"
                        type="date"
                        onChange={handleMatchChange}
                      />
                    </div>
                    {/* Hora */}
                    <div className="space-y-2">
                      <Label>Hora</Label>
                      <Input
                        name="hora"
                        type="time"
                        onChange={handleMatchChange}
                      />
                    </div>
                    {/* Resultado */}
                    <div className="space-y-2">
                      <Label>Resultado</Label>
                      <Input
                        name="resultado"
                        value={partidoData.resultado}
                        onChange={handleMatchChange}
                        placeholder="Ej: 6-4, 7-5"
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleRegisterMatch}>
                    Registrar Partido
                  </Button>
                </TabsContent>
                <TabsContent value="tournament" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>Nombre del Torneo</Label>
      <Input
        name="nombre"
        value={torneoData.nombre}
        onChange={handleTorneoChange}
        placeholder="Ej: Torneo Nacional 2024"
      />
    </div>
    <div className="space-y-2">
      <Label>Sede</Label>
      <Input
        name="sede"
        value={torneoData.sede}
        onChange={handleTorneoChange}
        placeholder="Ej: Club de Padel Cuernavaca"
      />
    </div>
    <div className="space-y-2">
      <Label>Fecha Inicio</Label>
      <Input
        name="fecha_inicio"
        type="date"
        value={torneoData.fecha_inicio}
        onChange={handleTorneoChange}
      />
    </div>
    <div className="space-y-2">
      <Label>Fecha Fin</Label>
      <Input
        name="fecha_fin"
        type="date"
        value={torneoData.fecha_fin}
        onChange={handleTorneoChange}
      />
    </div>
    <div className="space-y-2">
      <Label>Premio en Dinero</Label>
      <Input
        name="premio_dinero"
        type="number"
        value={torneoData.premio_dinero}
        onChange={handleTorneoChange}
        placeholder="Ej: 500000"
      />
    </div>
    {/* Puntos */}
    <div className="space-y-2">
      <Label>Puntos para Ranking</Label>
      <Input
        name="puntos"
        type="number"
        value={torneoData.puntos}
        onChange={(e) => setTorneoData({ ...torneoData, puntos: e.target.value })}
        placeholder="Ej: 250"
      />
    </div>
    {/* URL de Imagen */}
    <div className="space-y-2">
      <Label>URL de Imagen</Label>
      <Input
        name="imagen_url"
        type="url"
        value={torneoData.imagen_url}
        onChange={(e) => setTorneoData({ ...torneoData, imagen_url: e.target.value })}
        placeholder="Ej: https://example.com/imagen.jpg"
      />
    </div>
   
  </div>
  <Button className="w-full" onClick={handleRegisterTorneo}>
    Registrar Torneo
  </Button>
</TabsContent>
                <TabsContent value="player" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre Completo</Label>
                       <Input
                          name="nombre_completo"
                          value={playerData.nombre_completo}
                          onChange={handleChange}
                          placeholder="Ej: Carlos Ramírez"
                        />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        name="email"
                        type="email"
                        value={playerData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rating Inicial</Label>
                      <Input
                        name="rating_inicial"
                        type="number"
                        value={playerData.rating_inicial}
                        onChange={handleChange}
                        placeholder="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Club</Label>
                      <Input
                        name="club"
                        value={playerData.club}
                        onChange={handleChange}
                        placeholder="Ej: Club de Padel Cuernavaca"
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleRegisterPlayer}>
                    Registrar Jugador
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 lighting-card hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Aprobaciones Pendientes
          </h2>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <motion.div
                  key={approval.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    approval.status === 'approved' 
                      ? 'bg-green-50 dark:bg-green-900/10' 
                      : approval.status === 'rejected'
                      ? 'bg-red-50 dark:bg-red-900/10'
                      : 'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{approval.title}</h3>
                        <Badge variant="outline">{approval.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {approval.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {approval.timestamp}
                      </p>
                    </div>
                    {approval.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApproval(approval.id, true)}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleApproval(approval.id, false)}
                        >
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    ) : (
                      <Badge variant={approval.status === 'approved' ? 'success' : 'destructive'}>
                        {approval.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    date: '12 Abril',
                    type: 'Partido',
                    description: 'C.Ramírez/A.González vs M.Torres/L.Hernández',
                    status: 'Aprobado',
                  },
                  {
                    date: '12 Abril',
                    type: 'Ranking',
                    description: 'Actualización semanal de rankings',
                    status: 'Pendiente',
                  },
                  {
                    date: '11 Abril',
                    type: 'Torneo',
                    description: 'Registro nuevo torneo: Copa Verano 2024',
                    status: 'Aprobado',
                  },
                ].map((activity, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.type}</TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          activity.status === 'Aprobado' 
                            ? 'success' 
                            : activity.status === 'Pendiente'
                            ? 'warning'
                            : 'destructive'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
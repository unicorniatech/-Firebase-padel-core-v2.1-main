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
import { createUsuario, createTorneo,createPartido,fetchTorneos, fetchUsuarios, fetchPartidos } from '@/lib/api';
import { 
  Partido,
  Torneo,
  Usuario,
  PendingApproval, 
  PartidoForm,
  UsuarioForm,
 } from '@/lib/types';



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
const [partidos, setPartidos] = useState<Partido[]>([]);
 // Estado para manejar los datos del formulario de "Registrar Partido"
 const [partidoData, setPartidoData] = useState<PartidoForm>({
  equipo_1: [], // IDs de los jugadores seleccionados para el equipo 1
  equipo_2: [], // IDs de los jugadores seleccionados para el equipo 2
  fecha_hora: '',
  resultado: '',
  torneo: '', // ID del torneo seleccionado
});
// Estados para búsqueda
const [searchEquipo1, setSearchEquipo1] = useState(''); // Búsqueda para Equipo 1
const [searchEquipo2, setSearchEquipo2] = useState(''); // Búsqueda para Equipo 2
useEffect(() => {
  const loadPartidos = async () => {
    try {
      const data = await fetchPartidos(); // Llama a la API para obtener los partidos
      setPartidos(data); // Guarda los partidos en el estado
    } catch (error) {
      console.error('Error al cargar partidos:', error);
    }
  };
  loadPartidos();
}, []);


const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuarios registrados

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
        // 1) De tu estado partidoData, extrae la fecha y la hora
        const [fecha, hora] = partidoData.fecha_hora.split('T');
    
        // 2) Construye un objeto que coincida con el serializer del backend
        const partidoParaEnviar = {
          // ID del torneo:
          torneo: partidoData.torneo,
          // Lista de usuarios en equipo 1 (IDs):
          equipo_1_ids: partidoData.equipo_1,
          // Lista de usuarios en equipo 2 (IDs):
          equipo_2_ids: partidoData.equipo_2,
          // Campos separados:
          fecha,
          hora,
          // Resultado (opcional)
          resultado: partidoData.resultado,
        };
    
        const response = await createPartido(partidoParaEnviar);
        console.log('Partido registrado:', response);
    
        toast({
          title: 'Partido registrado con éxito',
          description: 'El partido ha sido agregado correctamente.',
        });
    
        // Actualiza la lista de partidos
        setPartidos((prev) => [...prev, response]);
    
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
                        onChange={(e) =>
                          setPartidoData((prev) => ({ ...prev, torneo: e.target.value }))
                        }
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

                    {/* Fecha */}
                    <div className="space-y-2">
                      <Label>Fecha</Label>
                      <Input
                        name="fecha"
                        type="date"
                        value={partidoData.fecha_hora.split('T')[0] || ''}
                        onChange={(e) =>
                          setPartidoData((prev) => ({
                            ...prev,
                            fecha_hora: `${e.target.value}T${prev.fecha_hora.split('T')[1] || '00:00'}`,
                          }))
                        }
                      />
                    </div>

                    {/* Hora */}
                    <div className="space-y-2">
                      <Label>Hora</Label>
                      <Input
                        name="hora"
                        type="time"
                        value={partidoData.fecha_hora.split('T')[1] || ''}
                        onChange={(e) =>
                          setPartidoData((prev) => ({
                            ...prev,
                            fecha_hora: `${prev.fecha_hora.split('T')[0] || '1970-01-01'}T${e.target.value}`,
                          }))
                        }
                      />
                    </div>

                    {/* Resultado */}
                    <div className="space-y-2">
                      <Label>Resultado</Label>
                      <Input
                        name="resultado"
                        value={partidoData.resultado}
                        onChange={(e) =>
                          setPartidoData((prev) => ({ ...prev, resultado: e.target.value }))
                        }
                        placeholder="Ej: 6-4, 7-5"
                      />
                    </div>

                    {/* Buscador de Jugadores para Equipo 1 */}
                    <div className="space-y-2 col-span-2">
                      <Label>Jugadores Equipo 1</Label>
                      <Input
                        type="text"
                        placeholder="Buscar por email"
                        value={searchEquipo1}
                        onChange={(e) => setSearchEquipo1(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                      />
                      <div className="max-h-40 overflow-y-auto border rounded">
                        {usuarios
                          .filter((usuario) =>
                            usuario.email.toLowerCase().includes(searchEquipo1.toLowerCase())
                          )
                          .map((usuario) => (
                            <div key={usuario.id} className="flex items-center gap-2 p-2">
                              <input
                                type="checkbox"
                                value={usuario.id}
                                checked={usuario.id ? partidoData.equipo_1.includes(usuario.id) : false}

                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setPartidoData((prev) => ({
                                      ...prev,
                                      equipo_1: [...prev.equipo_1, e.target.value],
                                    }));
                                  } else {
                                    setPartidoData((prev) => ({
                                      ...prev,
                                      equipo_1: prev.equipo_1.filter((id) => id !== e.target.value),
                                    }));
                                  }
                                }}
                              />
                              <span>{usuario.nombre_completo}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Buscador de Jugadores para Equipo 2 */}
                    <div className="space-y-2 col-span-2">
                      <Label>Jugadores Equipo 2</Label>
                      <Input
                        type="text"
                        placeholder="Buscar por email"
                        value={searchEquipo2}
                        onChange={(e) => setSearchEquipo2(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                      />
                      <div className="max-h-40 overflow-y-auto border rounded">
                        {usuarios
                          .filter((usuario) =>
                            usuario.email.toLowerCase().includes(searchEquipo2.toLowerCase())
                          )
                          .map((usuario) => (
                            <div key={usuario.id} className="flex items-center gap-2 p-2">
                              <input
                                type="checkbox"
                                value={usuario.id}
                                checked={usuario.id ? partidoData.equipo_2.includes(usuario.id) : false}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setPartidoData((prev) => ({
                                      ...prev,
                                      equipo_2: [...prev.equipo_2, e.target.value],
                                    }));
                                  } else {
                                    setPartidoData((prev) => ({
                                      ...prev,
                                      equipo_2: prev.equipo_2.filter((id) => id !== e.target.value),
                                    }));
                                  }
                                }}
                              />
                              <span>{usuario.nombre_completo}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Botón para Registrar el Partido */}
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
import { useState, useEffect } from 'react';
import { cursosService } from '../lib/cursosService';
import { certificadosService } from '../lib/certificadosService';
import { inscricoesService } from '../lib/inscricoesService';
import { blogService } from '../services/blogService';

export const useAdminData = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        cursosService.listarCursos(),
        inscricoesService.listarInscricoes()
      ]);

      setCourses(coursesRes.data || []);
      setEnrollments(enrollmentsRes.data || []);

      // Mock de Alunos Estendido
      setStudents([
        { id: '1', name: 'Afonso Maria', email: 'afonso@email.ao', bi: '001234567LA045', phone: '943574878', status: 'active', createdAt: '2025-01-10', lastAccess: '2025-02-14' },
        { id: '2', name: 'Dra. Ana Paula', email: 'ana.paula@saude.ao', bi: '005534217BE011', phone: '923000111', status: 'active', createdAt: '2025-02-01', lastAccess: '2025-02-15' },
        { id: '3', name: 'João Manuel', email: 'joao.m@farmacia.ao', bi: '009231456HU098', phone: '912000222', status: 'blocked', createdAt: '2024-12-15', lastAccess: '2025-01-05' }
      ]);

      // Mock de Pagamentos
      setPayments([
        { id: 'p1', studentName: 'Afonso Maria', amount: 25000, method: 'multicaixa', reference: 'MCX-9921', status: 'completed', createdAt: '2025-02-10' },
        { id: 'p2', studentName: 'Dra. Ana Paula', amount: 15000, method: 'express', reference: 'EX-0021', status: 'pending', createdAt: '2025-02-12' }
      ]);

      // Mock de Blog
      setBlogPosts([
        { id: 'b1', title: 'Novos Protocolos ARMED', author: 'Dr. Fernandes', category: 'Legislação', publishDate: '2025-02-10', views: 142, slug: 'novos-protocolos', status: 'published' }
      ]);

      // Mock de Administradores
      setAdminUsers([
        { id: 'a1', name: 'Super Admin', email: 'admin@amofarma.ao', role: 'super_admin', status: 'active', lastAccess: '2025-02-15', twoFactorEnabled: true }
      ]);

      // Estatísticas
      setStats({
        totalStudents: 1248,
        studentGrowth: 12,
        activeCourses: coursesRes.data?.length || 24,
        courseGrowth: 5,
        totalCertificates: 4502,
        certificateGrowth: 8,
        pendingEnrollments: enrollmentsRes.data?.filter(e => e.status === 'pendente').length || 14,
        enrollmentGrowth: -2,
        monthlyRevenue: 2450000,
        revenueGrowth: 15,
        conversionRate: 68,
        conversionGrowth: 4,
        pendingCertificates: 8,
        pendingPayments: 5,
        securityAlerts: 2,
        blockedIPs: 3,
        certsToday: 7
      });

      setRecentActivities([
        { title: 'Novo Registo', description: 'Afonso Maria criou conta.', time: 'há 5 min', status: 'success' },
        { title: 'Inscrição', description: 'Dra. Ana Paula submeteu candidatura.', time: 'há 12 min', status: 'info' }
      ]);

    } catch (error) {
      console.error('Erro ao carregar dados admin:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAllData(); }, []);

  const deleteCourse = async (id: string) => {
    await cursosService.eliminarCurso(id);
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateStudentStatus = async (id: string, status: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const cancelCertificate = async (id: string) => {
    setCertificates(prev => prev.map(c => c.id === id ? { ...c, status: 'cancelled' } : c));
  };

  const updateEnrollmentStatus = async (id: string, status: string) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const updatePaymentStatus = async (id: string, status: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const deleteBlogPost = async (id: string) => {
    await blogService.deletePost(id);
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  const updateAdminStatus = async (id: string, status: string) => {
    setAdminUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
  };

  const deleteAdmin = async (id: string) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
  };

  return {
    loading, stats, courses, students, certificates, enrollments, payments, blogPosts, adminUsers, recentActivities,
    deleteCourse, updateStudentStatus, cancelCertificate, updateEnrollmentStatus, updatePaymentStatus,
    deleteBlogPost, updateAdminStatus, deleteAdmin, refreshData: loadAllData
  };
};
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { useAuth } from './contexts/AuthContext';
import { Course, User, UserRole, BlogPost } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AiAssistant from './components/AiAssistant';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetails from './pages/CourseDetails';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import Blog from './pages/Blog';
import BlogPostDetails from './pages/BlogPostDetails';
import ValidateCertificate from './pages/ValidateCertificate';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import CareerSimulator from './pages/CareerSimulator';
import Cookies from './pages/Cookies';
import Disclaimer from './pages/Disclaimer';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailSent from './pages/VerifyEmailSent';
import TwoFactorAuth from './pages/TwoFactorAuth';

// Area do Aluno
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentCertificates from './pages/student/StudentCertificates';
import StudentPayments from './pages/student/StudentPayments';
import StudentNotifications from './pages/student/StudentNotifications';
import StudentProfile from './pages/student/StudentProfile';
import StudentSettings from './pages/student/StudentSettings';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourseList from './pages/admin/AdminCourseList';
import AdminCourseEditor from './pages/admin/AdminCourseEditor';
import AdminStudentList from './pages/admin/AdminStudentList';
import AdminBlog from './pages/admin/AdminBlog';
import AdminBlogForm from './pages/admin/AdminBlogForm';
import AdminCertificateManager from './pages/admin/AdminCertificateManager';
import AdminEnrollmentList from './pages/admin/AdminEnrollmentList';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSecurity from './pages/admin/AdminSecurity';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';

const MOCK_COURSES: Course[] = [
  { 
    id: '1', 
    title: 'Farmacovigilância Avançada', 
    shortDescription: 'Técnicas modernas de monitorização de efeitos adversos em Angola.', 
    longDescription: 'Este programa de elite aborda os protocolos internacionais da OMS aplicados ao contexto angolano. Focado no rigor regulatório e segurança do paciente.', 
    price: 25000, 
    instructor: 'Dr. Fernandes', 
    startDate: '2025-03-01',
    endDate: '2025-04-15',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306dca1c5?auto=format&fit=crop&q=80&w=800', 
    category: 'Farmácia Clínica', 
    hours: 40, 
    status: 'active', 
    learningOutcomes: ['Monitorização de Reações Adversas', 'Legislação ARMED', 'Gestão de Crises Sanitárias']
  }
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Novas Diretrizes ARMED 2025',
    summary: 'Análise detalhada sobre as recentes alterações na legislação farmacêutica angolana.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88',
    category: 'Legislação',
    date: '10 Fev 2025',
    author: 'Conselho Académico'
  }
];

function App() {
  const { logout, profile } = useAuth();

  const adminUser: User = {
    id: profile?.id || 'default-admin',
    name: profile?.nome_completo || 'Administrador',
    email: profile?.email || 'admin@amofarma.ao',
    bi: profile?.numero_bi || '000000000',
    role: profile?.role === 'super_admin' ? UserRole.SUPER_ADMIN : UserRole.ADMIN,
    status: 'active'
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          {/* LOGIN ADMIN */}
          <Route path="/acesso-a7f9k2" element={<AdminLogin onLogin={() => {}} />} />
          
          {/* ROTAS ADMIN PROTEGIDAS */}
          <Route path="/acesso-a7f9k2/*" element={
            <AdminRoute>
              <AdminLayout 
                user={adminUser} 
                onLogout={logout} 
                notifications={[]}
              >
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="cursos" element={<AdminCourseList courses={MOCK_COURSES} />} />
                  <Route path="cursos/novo" element={<AdminCourseEditor />} />
                  <Route path="cursos/editar/:id" element={<AdminCourseEditor />} />
                  <Route path="alunos" element={<AdminStudentList students={[]} />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="blog/novo" element={<AdminBlogForm />} />
                  <Route path="blog/:id" element={<AdminBlogForm />} />
                  <Route path="certificados" element={<AdminCertificateManager />} />
                  <Route path="inscricoes" element={<AdminEnrollmentList enrollments={[]} />} />
                  <Route path="pagamentos" element={<AdminPayments />} />
                  <Route path="usuarios" element={<AdminUsers />} />
                  <Route path="relatorios" element={<AdminReports />} />
                  <Route path="seguranca" element={<AdminSecurity />} />
                  <Route path="configuracoes" element={<AdminSettings />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } />

          {/* ÁREA DO ALUNO PROTEGIDA */}
          <Route path="/area-do-aluno/*" element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<StudentDashboard />} />
                <Route path="cursos" element={<StudentCourses />} />
                <Route path="certificados" element={<StudentCertificates />} />
                <Route path="pagamentos" element={<StudentPayments />} />
                <Route path="notificacoes" element={<StudentNotifications />} />
                <Route path="perfil" element={<StudentProfile />} />
                <Route path="configuracoes" element={<StudentSettings />} />
                <Route path="*" element={<Navigate to="/area-do-aluno" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* WEBSITE PÚBLICO */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home latestCourses={MOCK_COURSES} latestPosts={MOCK_POSTS} />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/privacidade" element={<Privacy />} />
                  <Route path="/termos" element={<Terms />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/aviso-legal" element={<Disclaimer />} />
                  <Route path="/simulador" element={<CareerSimulator />} />
                  <Route path="/cursos" element={<CourseCatalog courses={MOCK_COURSES} />} />
                  <Route path="/cursos/:id" element={<CourseDetails courses={MOCK_COURSES} />} />
                  <Route path="/checkout/:courseId" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/pagamento/sucesso" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
                  <Route path="/pagamento/falha" element={<ProtectedRoute><PaymentFailure /></ProtectedRoute>} />
                  <Route path="/blog" element={<Blog posts={MOCK_POSTS} />} />
                  <Route path="/blog/:id" element={<BlogPostDetails posts={MOCK_POSTS} />} />
                  <Route path="/validar" element={<ValidateCertificate />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/recuperar-senha" element={<ForgotPassword />} />
                  <Route path="/redefinir-senha" element={<ResetPassword />} />
                  <Route path="/verificar-email" element={<VerifyEmail />} />
                  <Route path="/verificar-email-enviado" element={<VerifyEmailSent />} />
                  <Route path="/2fa" element={<TwoFactorAuth />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
              <AiAssistant />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
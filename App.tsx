import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { AdminRoute } from './components/AdminRoute.tsx';
import { useAuth } from './contexts/AuthContext.tsx';
import { Course, User, UserRole, BlogPost } from './types.ts';

// Components
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import WhatsAppButton from './components/WhatsAppButton.tsx';
import AiAssistant from './components/AiAssistant.tsx';

// Public Pages
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import CourseCatalog from './pages/CourseCatalog.tsx';
import CourseDetails from './pages/CourseDetails.tsx';
import Checkout from './pages/Checkout.tsx';
import PaymentSuccess from './pages/PaymentSuccess.tsx';
import PaymentFailure from './pages/PaymentFailure.tsx';
import Blog from './pages/Blog.tsx';
import BlogPostDetails from './pages/BlogPostDetails.tsx';
import ValidateCertificate from './pages/ValidateCertificate.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import FAQ from './pages/FAQ.tsx';
import CareerSimulator from './pages/CareerSimulator.tsx';
import Cookies from './pages/Cookies.tsx';
import Disclaimer from './pages/Disclaimer.tsx';

// Auth Pages
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import VerifyEmail from './pages/VerifyEmail.tsx';
import VerifyEmailSent from './pages/VerifyEmailSent.tsx';
import TwoFactorAuth from './pages/TwoFactorAuth.tsx';

// Student Area
import StudentDashboard from './pages/student/StudentDashboard.tsx';
import StudentCourses from './pages/student/StudentCourses.tsx';
import StudentCertificates from './pages/student/StudentCertificates.tsx';
import StudentPayments from './pages/student/StudentPayments.tsx';
import StudentNotifications from './pages/student/StudentNotifications.tsx';
import StudentProfile from './pages/student/StudentProfile.tsx';
import StudentSettings from './pages/student/StudentSettings.tsx';

// Admin Area
import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminLayout from './pages/admin/AdminLayout.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminCourseList from './pages/admin/AdminCourseList.tsx';
import AdminCourseEditor from './pages/admin/AdminCourseEditor.tsx';
import AdminStudentList from './pages/admin/AdminStudentList.tsx';
import AdminBlog from './pages/admin/AdminBlog.tsx';
import AdminBlogForm from './pages/admin/AdminBlogForm.tsx';
import AdminCertificateManager from './pages/admin/AdminCertificateManager.tsx';
import AdminEnrollmentList from './pages/admin/AdminEnrollmentList.tsx';
import AdminPayments from './pages/admin/AdminPayments.tsx';
import AdminSecurity from './pages/admin/AdminSecurity.tsx';
import AdminSettings from './pages/admin/AdminSettings.tsx';
import AdminUsers from './pages/admin/AdminUsers.tsx';
import AdminReports from './pages/admin/AdminReports.tsx';

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
          <Route path="/acesso-a7f9k2" element={<AdminLogin onLogin={() => {}} />} />
          
          <Route path="/acesso-a7f9k2/*" element={
            <AdminRoute>
              <AdminLayout user={adminUser} onLogout={logout} notifications={[]}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="cursos" element={<AdminCourseList courses={MOCK_COURSES} />} />
                  <Route path="seguranca" element={<AdminSecurity />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } />

          <Route path="/area-do-aluno/*" element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<StudentDashboard />} />
                <Route path="cursos" element={<StudentCourses />} />
                <Route path="certificados" element={<StudentCertificates />} />
                <Route path="*" element={<Navigate to="/area-do-aluno" replace />} />
              </Routes>
            </ProtectedRoute>
          } />

          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home latestCourses={MOCK_COURSES} latestPosts={MOCK_POSTS} />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/privacidade" element={<Privacy />} />
                  <Route path="/cursos" element={<CourseCatalog courses={MOCK_COURSES} />} />
                  <Route path="/validar" element={<ValidateCertificate />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/simulador" element={<CareerSimulator />} />
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
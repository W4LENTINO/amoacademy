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
import Blog from './pages/Blog.tsx';
import BlogPostDetails from './pages/BlogPostDetails.tsx';
import ValidateCertificate from './pages/ValidateCertificate.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import FAQ from './pages/FAQ.tsx';
import CareerSimulator from './pages/CareerSimulator.tsx';

// Auth
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';

// Student Area
import StudentDashboard from './pages/student/StudentDashboard.tsx';
import StudentCourses from './pages/student/StudentCourses.tsx';
import StudentCertificates from './pages/student/StudentCertificates.tsx';

// Admin Area
import AdminLogin from './pages/admin/AdminLogin.tsx';
import AdminLayout from './pages/admin/AdminLayout.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminCourseList from './pages/admin/AdminCourseList.tsx';
import AdminSecurity from './pages/admin/AdminSecurity.tsx';
import AdminStudentList from './pages/admin/AdminStudentList.tsx';

const MOCK_COURSES: Course[] = [
  { 
    id: '1', 
    title: 'Farmacovigilância Avançada', 
    shortDescription: 'Protocolos de elite para monitorização ARMED.', 
    longDescription: 'Rigor regulatório e segurança do paciente em contexto nacional.', 
    price: 25000, 
    instructor: 'Dr. Fernandes', 
    startDate: '2025-03-01',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306dca1c5', 
    category: 'Farmácia Clínica', 
    hours: 40, 
    status: 'active', 
    learningOutcomes: ['Análise de Risco']
  }
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Diretrizes ARMED 2025',
    summary: 'Análise detalhada das novas normas do setor.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88',
    category: 'Legislação',
    date: '10 Fev 2025'
  }
];

function App() {
  const { logout, profile } = useAuth();

  const adminUser: User = {
    id: profile?.id || 'admin',
    name: profile?.nome_completo || 'Administrador Master',
    email: profile?.email || 'admin@amofarma.ao',
    bi: profile?.numero_bi || '000',
    role: UserRole.ADMIN,
    status: 'active'
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          {/* Rota Administrativa Secreta */}
          <Route path="/acesso-a7f9k2" element={<AdminLogin onLogin={() => {}} />} />
          
          {/* Área Admin Protegida */}
          <Route path="/acesso-a7f9k2/*" element={
            <AdminRoute>
              <AdminLayout user={adminUser} onLogout={logout} notifications={[]}>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="cursos" element={<AdminCourseList courses={MOCK_COURSES} />} />
                  <Route path="alunos" element={<AdminStudentList students={[]} />} />
                  <Route path="seguranca" element={<AdminSecurity />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } />

          {/* Área do Aluno */}
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

          {/* Site Público */}
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home latestCourses={MOCK_COURSES} latestPosts={MOCK_POSTS} />} />
                  <Route path="/cursos" element={<CourseCatalog courses={MOCK_COURSES} />} />
                  <Route path="/cursos/:id" element={<CourseDetails courses={MOCK_COURSES} />} />
                  <Route path="/blog" element={<Blog posts={MOCK_POSTS} />} />
                  <Route path="/blog/:id" element={<BlogPostDetails posts={MOCK_POSTS} />} />
                  <Route path="/validar" element={<ValidateCertificate />} />
                  <Route path="/simulador" element={<CareerSimulator />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/privacidade" element={<Privacy />} />
                  <Route path="/termos" element={<Terms />} />
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
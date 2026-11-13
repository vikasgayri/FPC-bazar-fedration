import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { PageLoader } from '@/components/ui/Primitives'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Initiatives = lazy(() => import('@/pages/Initiatives'))
const InitiativeDetail = lazy(() => import('@/pages/InitiativeDetail'))
const FpoServices = lazy(() => import('@/pages/FpoServices'))
const Shop = lazy(() => import('@/pages/Shop'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const EnquiryList = lazy(() => import('@/pages/EnquiryList'))
const SendEnquiry = lazy(() => import('@/pages/SendEnquiry'))
const EnquirySent = lazy(() => import('@/pages/EnquirySent'))
const Wishlist = lazy(() => import('@/pages/Wishlist'))
const Login = lazy(() => import('@/pages/account/Login'))
const Signup = lazy(() => import('@/pages/account/Signup'))
const Account = lazy(() => import('@/pages/account/Account'))
const Register = lazy(() => import('@/pages/Register'))
const TrackApplication = lazy(() => import('@/pages/TrackApplication'))
const Partner = lazy(() => import('@/pages/Partner'))
const Contact = lazy(() => import('@/pages/Contact'))
const News = lazy(() => import('@/pages/News'))
const NewsDetail = lazy(() => import('@/pages/NewsDetail'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('@/pages/admin/Products'))
const AdminTradeEnquiries = lazy(() => import('@/pages/admin/TradeEnquiries'))
const AdminRegistrations = lazy(() => import('@/pages/admin/Registrations'))
const AdminEnquiries = lazy(() => import('@/pages/admin/Enquiries'))
const AdminNews = lazy(() => import('@/pages/admin/NewsAdmin'))
const AdminGallery = lazy(() => import('@/pages/admin/GalleryAdmin'))

const S = (el: ReactNode) => <Suspense fallback={<PageLoader />}>{el}</Suspense>

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: S(<About />) },
      { path: '/initiatives', element: S(<Initiatives />) },
      { path: '/initiatives/:slug', element: S(<InitiativeDetail />) },
      { path: '/fpo-services', element: S(<FpoServices />) },
      { path: '/bazaar', element: S(<Shop />) },
      { path: '/bazaar/enquiry', element: S(<EnquiryList />) },
      { path: '/bazaar/enquiry/send', element: S(<SendEnquiry />) },
      { path: '/bazaar/enquiry/:number', element: S(<EnquirySent />) },
      // old e-commerce URLs → enquiry flow (FPC Bazaar does not sell)
      { path: '/bazaar/cart', element: <Navigate to="/bazaar/enquiry" replace /> },
      { path: '/bazaar/checkout', element: <Navigate to="/bazaar/enquiry/send" replace /> },
      { path: '/bazaar/:slug', element: S(<ProductDetail />) },
      { path: '/wishlist', element: S(<Wishlist />) },
      { path: '/login', element: S(<Login />) },
      { path: '/signup', element: S(<Signup />) },
      { path: '/account', element: S(<Account />) },
      { path: '/register', element: S(<Register />) },
      { path: '/register/track', element: S(<TrackApplication />) },
      { path: '/partner', element: S(<Partner />) },
      { path: '/contact', element: S(<Contact />) },
      { path: '/news', element: S(<News />) },
      { path: '/news/:slug', element: S(<NewsDetail />) },
      { path: '/gallery', element: S(<Gallery />) },
      { path: '*', element: S(<NotFound />) },
    ],
  },
  { path: '/admin/login', element: S(<AdminLogin />) },
  {
    path: '/admin',
    element: S(<AdminLayout />),
    children: [
      { index: true, element: S(<AdminDashboard />) },
      { path: 'products', element: S(<AdminProducts />) },
      { path: 'trade-enquiries', element: S(<AdminTradeEnquiries />) },
      { path: 'orders', element: <Navigate to="/admin/trade-enquiries" replace /> },
      { path: 'registrations', element: S(<AdminRegistrations />) },
      { path: 'enquiries', element: S(<AdminEnquiries />) },
      { path: 'news', element: S(<AdminNews />) },
      { path: 'gallery', element: S(<AdminGallery />) },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

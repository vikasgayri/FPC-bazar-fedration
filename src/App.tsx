import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SiteLayout from '@/components/layout/SiteLayout'
import { PageLoader } from '@/components/ui/Primitives'
import Home from '@/pages/Home'

const About = lazy(() => import('@/pages/About'))
const Initiatives = lazy(() => import('@/pages/Initiatives'))
const InitiativeDetail = lazy(() => import('@/pages/InitiativeDetail'))
const Shop = lazy(() => import('@/pages/Shop'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'))
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
const AdminOrders = lazy(() => import('@/pages/admin/Orders'))
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
      { path: '/bazaar', element: S(<Shop />) },
      { path: '/bazaar/cart', element: S(<Cart />) },
      { path: '/bazaar/checkout', element: S(<Checkout />) },
      { path: '/bazaar/order/:number', element: S(<OrderSuccess />) },
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
      { path: 'orders', element: S(<AdminOrders />) },
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

import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import ProductCard from '@/components/shop/ProductCard'
import { EmptyState } from '@/components/ui/Primitives'
import { useCart } from '@/context/CartContext'
import { useLang } from '@/hooks/useLang'
import { useDocumentTitle } from '@/hooks/useUi'
import { productService } from '@/services/productService'
import { stock } from '@/data/images'

export default function Wishlist() {
  const { wishlist } = useCart()
  const { t } = useLang()
  useDocumentTitle(t('wishlist.title'))
  const products = productService.getManyByIdSync(wishlist)
  return (
    <>
      <PageHero title={t('wishlist.title')} image={stock.spicesMarket} fallback="/images/real/fpo-products.jpg" crumbs={[{ label: t('nav.bazaar'), to: '/bazaar' }, { label: t('nav.wishlist') }]} size="sm" />
      <section className="bg-cream-50 py-12 sm:py-16">
        <div className="container">
          {products.length === 0 ? (
            <EmptyState icon={<Heart className="h-7 w-7" />} title={t('wishlist.empty')} action={<Link to="/bazaar" className="btn-primary">{t('cart.continue')}</Link>} />
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

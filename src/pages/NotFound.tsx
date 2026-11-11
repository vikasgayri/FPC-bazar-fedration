import { Link } from 'react-router-dom'
import PageHero from '@/components/ui/PageHero'
import { real } from '@/data/images'
import { useLang } from '@/hooks/useLang'

export default function NotFound() {
  const { t } = useLang()
  return (
    <PageHero title="404 — Page not found" text="The page you’re looking for doesn’t exist or has moved." image={real.fieldVisit} crumbs={[{ label: '404' }]}>
      <Link to="/" className="btn-gold">
        {t('nav.home')}
      </Link>
    </PageHero>
  )
}

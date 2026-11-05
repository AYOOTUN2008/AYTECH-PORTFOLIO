import {site} from '@/lib/site';
import WhatsAppButton from '@/components/whatsapp-button';
export default function ContactActions(){const subject=encodeURIComponent('Project inquiry — AYTECH Creative');return <div className="direct-contact-actions"><WhatsAppButton label="WhatsApp"/><a className="button email-button" href={`mailto:${site.email}?subject=${subject}`}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>Send email</a></div>}

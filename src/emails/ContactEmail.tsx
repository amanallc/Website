import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  phone?: string;
  zip: string;
  message: string;
}

export function ContactEmail({ name, email, phone, zip, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New quote request from {name} — Amana Construction</Preview>
      <Body style={{ backgroundColor: '#F7F7F4', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Container
          style={{
            maxWidth: '600px',
            margin: '40px auto',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <Section style={{ backgroundColor: '#282933', padding: '32px 40px' }}>
            <Heading
              style={{
                color: '#C99717',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '0 0 4px',
              }}
            >
              Amana Construction
            </Heading>
            <Text style={{ color: '#ffffff', margin: 0, fontSize: '14px', opacity: 0.8 }}>
              New Quote Request — Built on Trust
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '32px 40px' }}>
            <Text style={{ color: '#282933', fontSize: '16px', marginBottom: '24px' }}>
              You have received a new quote request from your website.
            </Text>

            <Hr style={{ borderColor: '#e5e5e5', margin: '0 0 24px' }} />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: '8px 0',
                      color: '#666',
                      width: '100px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Name
                  </td>
                  <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{name}</td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: '8px 0',
                      color: '#666',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Email
                  </td>
                  <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{email}</td>
                </tr>
                {phone && (
                  <tr>
                    <td
                      style={{
                        padding: '8px 0',
                        color: '#666',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      Phone
                    </td>
                    <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>
                      {phone}
                    </td>
                  </tr>
                )}
                <tr>
                  <td
                    style={{
                      padding: '8px 0',
                      color: '#666',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Zip Code
                  </td>
                  <td style={{ padding: '8px 0', color: '#282933', fontSize: '14px' }}>{zip}</td>
                </tr>
              </tbody>
            </table>

            <Hr style={{ borderColor: '#e5e5e5', margin: '24px 0' }} />

            <Text
              style={{ color: '#666', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}
            >
              Message
            </Text>
            <Text
              style={{
                color: '#282933',
                fontSize: '15px',
                lineHeight: '1.6',
                backgroundColor: '#F7F7F4',
                padding: '16px',
                borderRadius: '6px',
                borderLeft: '3px solid #C99717',
              }}
            >
              {message}
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: '#282933',
              padding: '20px 40px',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: '12px', margin: 0, opacity: 0.6 }}>
              Amana Construction &middot; Built on Trust &middot; Roswell, GA &middot; (678)
              468-8022
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

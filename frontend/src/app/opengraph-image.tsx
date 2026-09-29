import { ImageResponse } from 'next/og';
import { firm } from '@/data/firm';

export const alt = `${firm.name} — ${firm.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#071525',
                    color: '#F4E8C7',
                }}
            >
                <div
                    style={{
                        width: 1120,
                        height: 550,
                        border: '1px solid #B99142',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 44,
                    }}
                >
                    <div
                        style={{
                            width: 174,
                            height: 174,
                            border: '4px solid #D7B15B',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#E4C477',
                            fontFamily: 'Georgia, serif',
                            fontSize: 118,
                            lineHeight: 1,
                        }}
                    >
                        M
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                            style={{
                                color: '#F4E8C7',
                                fontFamily: 'Georgia, serif',
                                fontSize: 72,
                                lineHeight: 1.1,
                            }}
                        >
                            {firm.name}
                        </div>
                        <div
                            style={{
                                width: 460,
                                height: 1,
                                backgroundColor: '#B99142',
                                marginTop: 22,
                                marginBottom: 18,
                            }}
                        />
                        <div
                            style={{
                                color: '#D7B15B',
                                fontFamily: 'Georgia, serif',
                                fontSize: 28,
                                fontStyle: 'italic',
                            }}
                        >
                            {firm.tagline}
                        </div>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
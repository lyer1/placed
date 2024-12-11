import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Mycompanycard({ company }) {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const fetchLogo = async () => {
            try {
                const response = await fetch(`https://api.api-ninjas.com/v1/logo?name=${company}`, {
                    headers: {
                        'X-Api-Key': 'k9DDX8Fy6qAVyeswIB8MlSbFotxLDvcqKSRh9KPd'
                    }
                });
                const data = await response.json();
                if (data.length > 0) {
                    setLogoUrl(data[0].image);
                }
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogo();
    }, [company]);

    return (
        <div className="card">
            {logoUrl ? (
                <img className="card-image" src={logoUrl} alt={company} />
            ) : (<p>Loading logo...</p>)}
            <h2 className="card-title">{company}</h2>
        </div>
    );
}

Mycompanycard.propTypes = {
    company: PropTypes.string.isRequired
};

export default Mycompanycard;

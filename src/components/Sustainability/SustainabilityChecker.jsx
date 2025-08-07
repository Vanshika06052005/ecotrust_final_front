import React, { useState } from 'react';

const SustainabilityChecker = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const API_BASE_URL = 'http://localhost:5000'; // Change this to your Flask server URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset states
        setLoading(false);
        setResults(null);
        setError('');
        
        // Validate URL
        try {
            new URL(url);
        } catch {
            setError('Please enter a valid URL');
            return;
        }
        
        // Show loading
        setLoading(true);
        
        try {
            const response = await fetch(`${API_BASE_URL}/check_certifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setResults(data);
            
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to analyze website. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    const getScoreClass = (score) => {
        if (score >= 7) return 'score-high';
        if (score >= 4) return 'score-medium';
        return 'score-low';
    };

    const getScoreDescription = (score) => {
        if (score >= 7) return 'Excellent sustainability practices!';
        if (score >= 4) return 'Good sustainability efforts with room for improvement.';
        return 'Limited sustainability certifications found.';
    };

    const ScoreCircle = ({ score }) => {
        const [animatedScore, setAnimatedScore] = useState(0);

        React.useEffect(() => {
            if (score) {
                let currentScore = 0;
                const increment = score / 20;
                
                const animation = setInterval(() => {
                    currentScore += increment;
                    if (currentScore >= score) {
                        currentScore = score;
                        clearInterval(animation);
                    }
                    setAnimatedScore(Math.round(currentScore));
                }, 50);

                return () => clearInterval(animation);
            }
        }, [score]);

        return (
            <div className={`score-circle ${getScoreClass(score)}`}>
                <span>{animatedScore}</span>
            </div>
        );
    };

    return (
        <div className="sustainability-checker">
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap');

                .sustainability-checker {
                    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    position: relative;
                    min-height: 100vh;
                    background: linear-gradient(to bottom right, #111827, #1f2937, #111827);
                    overflow: hidden;
                    padding: 20px;
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    padding: 50px;
                    box-shadow: 
                        0 25px 50px rgba(0, 0, 0, 0.15),
                        0 0 0 1px rgba(255, 255, 255, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    position: relative;
                    overflow: hidden;
                }

                .container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0.05) 50%, 
                        rgba(255, 255, 255, 0.1) 100%);
                    pointer-events: none;
                }

                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .header h1 {
                    color: #ffffff;
                    font-family: 'Poppins', sans-serif;
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 15px;
                    text-shadow: 
                        0 0 20px rgba(255, 255, 255, 0.5),
                        0 0 40px rgba(102, 126, 234, 0.3),
                        0 4px 8px rgba(0, 0, 0, 0.3);
                    letter-spacing: -2px;
                    line-height: 1.1;
                }

                .header p {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.2rem;
                    font-weight: 400;
                    line-height: 1.7;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .form-section {
                    margin-bottom: 40px;
                }

                .input-container {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .input-group {
                    position: relative;
                    flex: 1;
                }

                .input-group input {
                    width: 100%;
                    padding: 18px 25px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 15px;
                    font-size: 1.1rem;
                    font-weight: 500;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    color: #fff;
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .input-group input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }

                .input-group input:focus {
                    outline: none;
                    border-color: rgba(255, 255, 255, 0.6);
                    background: rgba(255, 255, 255, 0.2);
                    box-shadow: 
                        0 0 0 4px rgba(255, 255, 255, 0.1),
                        0 12px 40px rgba(0, 0, 0, 0.15),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }

                .check-btn {
                    padding: 18px 35px;
                    background: linear-gradient(135deg, #00d4aa 0%, #00b894 50%, #00a085 100%);
                    color: white;
                    border: none;
                    border-radius: 15px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    font-family: 'Poppins', sans-serif;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 
                        0 8px 30px rgba(0, 212, 170, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    white-space: nowrap;
                    min-width: 200px;
                }

                .check-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.6s;
                }

                .check-btn:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 
                        0 15px 40px rgba(0, 212, 170, 0.4),
                        0 0 0 1px rgba(255, 255, 255, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    background: linear-gradient(135deg, #00e6c0 0%, #00d4aa 50%, #00b894 100%);
                }

                .check-btn:hover::before {
                    left: 100%;
                }

                .check-btn:active {
                    transform: translateY(-1px) scale(1.01);
                }

                .check-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                    box-shadow: 0 4px 15px rgba(0, 212, 170, 0.2);
                }

                .loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin: 30px 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                .spinner {
                    width: 24px;
                    height: 24px;
                    border: 3px solid rgba(255, 255, 255, 0.2);
                    border-top: 3px solid #ff6b6b;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .results {
                    margin-top: 40px;
                    padding: 35px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 
                        0 20px 40px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .score-section {
                    text-align: center;
                    margin-bottom: 35px;
                    padding: 30px;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(15px);
                    border-radius: 18px;
                    box-shadow: 
                        0 10px 30px rgba(0, 0, 0, 0.1),
                        0 0 0 1px rgba(255, 255, 255, 0.1);
                }

                .score-circle {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 2.5rem;
                    font-weight: 800;
                    font-family: 'Poppins', sans-serif;
                    color: white;
                    position: relative;
                    box-shadow: 
                        0 15px 35px rgba(0, 0, 0, 0.2),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2);
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .score-low { 
                    background: linear-gradient(135deg, #ff6b6b 0%, #ff5252 50%, #e53935 100%);
                    box-shadow: 
                        0 15px 35px rgba(255, 107, 107, 0.4),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2);
                }
                
                .score-medium { 
                    background: linear-gradient(135deg, #ffa726 0%, #ff9800 50%, #f57c00 100%);
                    box-shadow: 
                        0 15px 35px rgba(255, 167, 38, 0.4),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2);
                }
                
                .score-high { 
                    background: linear-gradient(135deg, #00d4aa 0%, #00b894 50%, #00a085 100%);
                    box-shadow: 
                        0 15px 35px rgba(0, 212, 170, 0.4),
                        inset 0 2px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -2px 0 rgba(0, 0, 0, 0.2);
                }

                .score-section h3 {
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .score-section p {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1.1rem;
                    font-weight: 500;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                }

                .certifications-section {
                    margin-top: 25px;
                }

                .certifications-section h3 {
                    color: white;
                    font-family: 'Poppins', sans-serif;
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    font-weight: 700;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .cert-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }

                .cert-badge {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #9575cd 100%);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    font-family: 'Inter', sans-serif;
                    box-shadow: 
                        0 8px 25px rgba(102, 126, 234, 0.3),
                        0 0 0 1px rgba(255, 255, 255, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .cert-badge:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 
                        0 12px 30px rgba(102, 126, 234, 0.4),
                        0 0 0 1px rgba(255, 255, 255, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .no-certs {
                    color: rgba(255, 255, 255, 0.8);
                    font-style: italic;
                    font-weight: 500;
                    padding: 20px;
                    text-align: center;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .error {
                    margin-top: 25px;
                    padding: 20px;
                    background: rgba(255, 107, 107, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 107, 107, 0.3);
                    border-radius: 12px;
                    color: #ff6b6b;
                    font-weight: 600;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 30px 20px;
                        margin: 10px;
                    }
                    
                    .header h1 {
                        font-size: 2.5rem;
                        letter-spacing: -1px;
                    }

                    .header p {
                        font-size: 1rem;
                    }
                    
                    .input-container {
                        flex-direction: column;
                        gap: 20px;
                    }
                    
                    .check-btn {
                        width: 100%;
                        min-width: auto;
                    }

                    .score-circle {
                        width: 120px;
                        height: 120px;
                        font-size: 2rem;
                    }
                }
            `}</style>

            <div className="container">
                <div className="header">
                    <h1>🌱 Sustainability Checker</h1>
                    <p>Enter a company website URL to analyze their sustainability certifications and get an environmental score.</p>
                </div>

                <div className="form-section">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <div className="input-group">
                                <input 
                                    type="url" 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://example.com" 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="check-btn" 
                                disabled={loading}
                            >
                                🌱 {loading ? 'Analyzing...' : 'Check Sustainability Score'}
                            </button>
                        </div>
                    </form>
                </div>

                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                        <span>Analyzing website for certifications...</span>
                    </div>
                )}

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {results && (
                    <div className="results">
                        <div className="score-section">
                            <ScoreCircle score={results.sustainability_score} />
                            <h3>Sustainability Score</h3>
                            <p>{getScoreDescription(results.sustainability_score)}</p>
                        </div>

                        <div className="certifications-section">
                            <h3>🏆 Found Certifications</h3>
                            <div>
                                {results.certifications && results.certifications.length > 0 ? (
                                    <div className="cert-list">
                                        {results.certifications.map((cert, index) => (
                                            <span key={index} className="cert-badge">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-certs">
                                        No sustainability certifications detected on this website.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SustainabilityChecker; 
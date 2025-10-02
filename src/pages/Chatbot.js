import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Chatbot = ({ user, onAuthClick, onLogout }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🙏 AyurBot: Namaste! I'm your Ayurvedic assistant powered by ancient wisdom. I can help you understand your symptoms and suggest appropriate Panchakarma therapies based on your unique constitution. Please describe your current health concerns or symptoms.",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [doshaForm, setDoshaForm] = useState({
    bodyBuild: '',
    skinType: '',
    energyLevel: ''
  });
  const [doshaResult, setDoshaResult] = useState('');

  const therapyRecommendations = {
    'stress': ['Shirodhara', 'Abhyanga'],
    'anxiety': ['Shirodhara', 'Nasya'],
    'digestive': ['Virechana', 'Basti'],
    'joint pain': ['Abhyanga', 'Swedana'],
    'sleep': ['Shirodhara', 'Abhyanga'],
    'headache': ['Shirodhara', 'Nasya'],
    'fatigue': ['Abhyanga', 'Swedana'],
    'skin': ['Abhyanga', 'Virechana'],
    'respiratory': ['Nasya', 'Swedana'],
    'weight': ['Swedana', 'Virechana']
  };

  const therapyDescriptions = {
    'Abhyanga': 'Full body oil massage that improves circulation and reduces stress',
    'Shirodhara': 'Continuous oil pouring on forehead, excellent for mental relaxation',
    'Swedana': 'Steam therapy that helps with detoxification and joint mobility',
    'Nasya': 'Nasal therapy for respiratory and neurological issues',
    'Basti': 'Medicated enema therapy for digestive and nervous system disorders',
    'Virechana': 'Therapeutic purgation for detoxification',
    'Vamana': 'Therapeutic emesis for respiratory and skin conditions'
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const recommendations = [];
    
    for (const [symptom, therapies] of Object.entries(therapyRecommendations)) {
      if (message.includes(symptom)) {
        recommendations.push(...therapies);
      }
    }
    
    if (recommendations.length > 0) {
      const uniqueTherapies = [...new Set(recommendations)];
      let response = `Based on your symptoms, I recommend these Panchakarma therapies:\n\n`;
      
      uniqueTherapies.forEach(therapy => {
        response += `🌿 **${therapy}**: ${therapyDescriptions[therapy]}\n\n`;
      });
      
      response += `Please consult with our qualified Ayurvedic practitioners before starting any therapy. Would you like to schedule an appointment?`;
      return response;
    }
    
    if (message.includes('appointment') || message.includes('schedule')) {
      return `I can help you schedule an appointment! Please visit our scheduling page to book your preferred therapy session with our experienced practitioners.`;
    }
    
    return `Thank you for your question. For specific health concerns, I recommend describing your symptoms in detail. I can suggest appropriate Panchakarma therapies based on traditional Ayurvedic principles.`;
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const quickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => sendMessage(), 100);
  };

  const assessDosha = () => {
    const { bodyBuild, skinType, energyLevel } = doshaForm;
    
    if (!bodyBuild || !skinType || !energyLevel) {
      alert('Please answer all questions for accurate assessment.');
      return;
    }
    
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    scores[bodyBuild]++;
    scores[skinType]++;
    scores[energyLevel]++;
    
    const dominantDosha = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    const doshaInfo = {
      vata: {
        name: 'Vata',
        description: 'Air and space elements. Governs movement and nervous system.',
        therapies: ['Abhyanga', 'Shirodhara', 'Basti'],
        tips: 'Focus on warm, nourishing treatments and regular routines.'
      },
      pitta: {
        name: 'Pitta', 
        description: 'Fire and water elements. Governs metabolism and digestion.',
        therapies: ['Shirodhara', 'Virechana', 'Abhyanga with cooling oils'],
        tips: 'Avoid excessive heat and focus on cooling, calming treatments.'
      },
      kapha: {
        name: 'Kapha',
        description: 'Earth and water elements. Governs structure and immunity.',
        therapies: ['Swedana', 'Virechana', 'Vamana'],
        tips: 'Focus on stimulating, warming treatments and regular exercise.'
      }
    };
    
    const result = doshaInfo[dominantDosha];
    setDoshaResult(result);
  };

  return (
    <div>
      <div className='navbar-pos'>
      <Navbar user={user} onAuthClick={onAuthClick} onLogout={onLogout} />
      </div>
      <main className="container" style={{ marginTop: "3rem" }}>
        <div className="card">
          <h2>🤖 AI Ayurvedic Assistant 🌿</h2>
          <p>Get personalized recommendations based on your symptoms and constitution through ancient Ayurvedic wisdom.</p>
          <p style={{ color: '#8b4513', fontStyle: 'italic', marginTop: '0.5rem' }}>
            "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need" - Ayurvedic Proverb
          </p>
          
          <div className="chat-container">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}-message`}>
                {message.sender === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br/>') }} />
                ) : (
                  <strong>You:</strong> + ' ' + message.text
                )}
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderRadius:"1rem"}}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe your symptoms or ask a question..." 
              style={{ padding: 10, flex: 1 }}
             
            />
            <button onClick={sendMessage} className="btn">Send</button>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <h4>Quick Questions:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button onClick={() => quickQuestion('I have stress and anxiety')} className="btn" style={{ fontSize: '0.9rem' }}>Stress & Anxiety</button>
              <button onClick={() => quickQuestion('I have digestive issues')} className="btn" style={{ fontSize: '0.9rem' }}>Digestive Issues</button>
              <button onClick={() => quickQuestion('I have joint pain')} className="btn" style={{ fontSize: '0.9rem' }}>Joint Pain</button>
              <button onClick={() => quickQuestion('I have sleep problems')} className="btn" style={{ fontSize: '0.9rem' }}>Sleep Issues</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>⚖️ Dosha Assessment ⚖️</h3>
          <p>Answer these questions to discover your unique Ayurvedic constitution (Prakriti):</p>
          <p style={{ color: '#8b4513', fontStyle: 'italic', marginBottom: '1rem' }}>
            "Know your constitution, live in harmony with nature"
          </p>
          
          <div className="form-group">
            <label>Body Build:</label>
            <select 
             style={{ padding: 10 }}
              value={doshaForm.bodyBuild} 
              onChange={(e) => setDoshaForm({...doshaForm, bodyBuild: e.target.value})}
            >
              <option value="">Select</option>
              <option value="vata">Thin, light frame</option>
              <option value="pitta">Medium build</option>
              <option value="kapha">Heavy, solid build</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Skin Type:</label>
            <select 
             style={{ padding: 10 }}
              value={doshaForm.skinType} 
              onChange={(e) => setDoshaForm({...doshaForm, skinType: e.target.value})}
            >
              <option value="">Select</option>
              <option value="vata">Dry, rough</option>
              <option value="pitta">Oily, sensitive</option>
              <option value="kapha">Thick, smooth</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Energy Level:</label>
            <select 
             style={{ padding: 10 }}
              value={doshaForm.energyLevel} 
              onChange={(e) => setDoshaForm({...doshaForm, energyLevel: e.target.value})}
            >
              <option value="">Select</option>
              <option value="vata">Variable, bursts of energy</option>
              <option value="pitta">Moderate, steady</option>
              <option value="kapha">Low but sustained</option>
            </select>
          </div>
          
          <button onClick={assessDosha} className="btn">Assess My Dosha</button>
          
          {doshaResult && (
            <div className="notification" style={{ marginTop: '1rem' }}>
              <h4>Your Dominant Dosha: {doshaResult.name}</h4>
              <p>{doshaResult.description}</p>
              <p><strong>Recommended Therapies:</strong> {doshaResult.therapies.join(', ')}</p>
              <p><strong>Lifestyle Tips:</strong> {doshaResult.tips}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
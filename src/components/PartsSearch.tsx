import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Package } from 'lucide-react';

interface Part {
  id: string;
  name: string;
  brand: string;
  price: number;
  location: string;
  distance: number;
  stock: number;
}

const PartsSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState<Part[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Datos de ejemplo
  const mockParts: Part[] = [
    {
      id: '1',
      name: 'Filtro de aceite',
      brand: 'Bosch',
      price: 450,
      location: 'Centro, CDMX',
      distance: 2.5,
      stock: 15
    },
    {
      id: '2',
      name: 'Batería 12V',
      brand: 'Century',
      price: 1200,
      location: 'Polanco, CDMX',
      distance: 5.1,
      stock: 8
    },
    {
      id: '3',
      name: 'Pastillas de freno',
      brand: 'Brembo',
      price: 850,
      location: 'Roma Norte, CDMX',
      distance: 3.2,
      stock: 12
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      // Simular API call con fuzzy search
      const searchResults = await performFuzzySearch(searchTerm, brand, model, year);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock data
      setResults(mockParts.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.brand.toLowerCase().includes(brand.toLowerCase())
      ));
    } finally {
      setIsSearching(false);
    }
  };

  const performFuzzySearch = async (term: string, vehicleBrand: string, vehicleModel: string, vehicleYear: string): Promise<Part[]> => {
    // Simular búsqueda fuzzy con scoring
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockParts.filter(part => {
          const termScore = fuzzyMatch(part.name.toLowerCase(), term.toLowerCase());
          const brandScore = vehicleBrand ? fuzzyMatch(part.brand.toLowerCase(), vehicleBrand.toLowerCase()) : 1;
          
          return termScore > 0.3 || brandScore > 0.5;
        }).sort((a, b) => {
          const scoreA = fuzzyMatch(a.name.toLowerCase(), term.toLowerCase());
          const scoreB = fuzzyMatch(b.name.toLowerCase(), term.toLowerCase());
          return scoreB - scoreA;
        });
        
        resolve(filtered);
      }, 800);
    });
  };

  const fuzzyMatch = (str: string, pattern: string): number => {
    if (!pattern) return 1;
    if (str.includes(pattern)) return 1;
    
    let score = 0;
    let patternIndex = 0;
    
    for (let i = 0; i < str.length && patternIndex < pattern.length; i++) {
      if (str[i] === pattern[patternIndex]) {
        score++;
        patternIndex++;
      }
    }
    
    return score / pattern.length;
  };

  return (
    <div className="parts-search">
      <h2>Búsqueda Inteligente de Refacciones</h2>

      <div className="search-form">
        <div className="form-row">
          <div className="form-group">
            <label>¿Qué necesitas?</label>
            <input
              type="text"
              placeholder="Ej: filtro de aceite, batería..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Marca del vehículo</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Seleccionar marca</option>
              <option value="toyota">Toyota</option>
              <option value="nissan">Nissan</option>
              <option value="vw">Volkswagen</option>
              <option value="ford">Ford</option>
              <option value="chevrolet">Chevrolet</option>
            </select>
          </div>

          <div className="form-group">
            <label>Modelo</label>
            <input
              type="text"
              placeholder="Ej: Corolla, Sentra..."
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Año</label>
            <input
              type="number"
              placeholder="2020"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="search-button"
          disabled={isSearching}
        >
          <Search size={20} />
          {isSearching ? 'Buscando...' : 'Buscar Refacciones'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="search-results">
          <h3>Resultados encontrados ({results.length})</h3>
          <div className="parts-grid">
            {results.map(part => (
              <div key={part.id} className="part-card">
                <div className="part-header">
                  <h4>{part.name}</h4>
                  <span className="brand">{part.brand}</span>
                </div>

                <div className="part-details">
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>${part.price}</span>
                  </div>

                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{part.location} ({part.distance}km)</span>
                  </div>

                  <div className="detail-item">
                    <Package size={16} />
                    <span>{part.stock} en stock</span>
                  </div>
                </div>

                <div className="part-actions">
                  <button 
                    className="contact-button"
                    onClick={() => window.open(`tel:+525512345678`)}
                  >
                    📞 Llamar
                  </button>
                  <button 
                    className="directions-button"
                    onClick={() => window.open(`https://maps.google.com/?q=${part.location}`)}
                  >
                    🗺️ Ubicación
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartsSearch;

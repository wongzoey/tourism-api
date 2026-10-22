
export const topMarkup = `
  <!-- Navigation -->
  <nav class="navbar">
    <div class="brand">
      <i class="fa-solid fa-spa brand-logo-icon"></i>
      <div class="brand-text">
        <h1>Malaysia</h1>
        <span>Truly Asia</span>
      </div>
    </div>

    <ul class="nav-links">
      <li><a href="#landmarks">Landmarks</a></li>
      <li><a href="#destinations">Regions</a></li>
      <li><a href="#culture">Heritage & Taste</a></li>
      <li><a href="#plan">Plan Trip</a></li>
    </ul>

    <a class="btn btn-gold" href="#tours">
      <i class="fa-regular fa-compass"></i> Explore Now
    </a>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <div class="hero-content">
      <span class="badge-hero">Welcome to Malaysia</span>

      <h1>Where Ancient Rainforests Meet Futuristic Skylines</h1>

      <p>
        Journey through vibrant cultures, soaring architectural wonders,
        and millions of years of untouched biodiversity.
      </p>

      <!-- Discovery Bar -->
      <div class="discovery-bar">
        <div class="disc-item">
          <i class="fa-solid fa-location-dot"></i>
          <div>
            <label for="hero-destination">Destination</label>
            <select id="hero-destination">
              <option>All Malaysia</option>
              <option>Kuala Lumpur & Selangor</option>
              <option>Penang & Perlis</option>
              <option>Sabah (Borneo)</option>
              <option>Sarawak (Borneo)</option>
              <option>Langkawi & Kedah</option>
            </select>
          </div>
        </div>

        <div class="disc-item">
          <i class="fa-solid fa-mountain-sun"></i>
          <div>
            <label for="hero-experience">Experience</label>
            <select id="hero-experience">
              <option>Iconic Landmarks</option>
              <option>Rainforest Trekking</option>
              <option>UNESCO Heritage</option>
              <option>Culinary Trails</option>
            </select>
          </div>
        </div>

        <div class="disc-item">
          <i class="fa-regular fa-calendar"></i>
          <div>
            <label for="hero-travel-period">Travel Period</label>
            <input
              id="hero-travel-period"
              type="text"
              value="All Year Round"
              readonly
            />
          </div>
        </div>

        <a
          class="btn btn-gold"
          href="#tours"
          style="padding: 14px 28px;"
        >
          <i class="fa-solid fa-magnifying-glass"></i> Find
        </a>
      </div>
    </div>
  </header>

  <!-- Iconic Malaysian Landmarks -->
  <main id="landmarks" class="section-container">
    <div class="section-header">
      <span class="section-subtitle">Crown Jewels of the Nation</span>
      <h2 class="section-title">Iconic Malaysian Landmarks</h2>
      <p class="section-description">
        From modern architectural triumphs to ancient limestone temples
        and majestic mountain peaks, explore the sites that define Malaysia.
      </p>
    </div>

    <div class="landmarks-grid">

      <!-- Landmark 1: Petronas Twin Towers -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
            alt="Petronas Twin Towers in Kuala Lumpur"
            loading="lazy"
          />
          <span class="tag-badge">Modern Wonder</span>
          <span class="region-badge">Kuala Lumpur</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              Federal Territory
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.9 (42k Reviews)
            </span>
          </div>

          <h3 class="card-title">Petronas Twin Towers</h3>

          <p class="card-text">
            Standing tall at 451.9 meters, these world-famous 88-storey
            twin skyscrapers blend Islamic motifs with futuristic
            post-modern architecture, connected by a skybridge on the
            41st floor.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              Must See Skyline
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- Landmark 2: Batu Caves -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
            alt="Batu Caves colorful steps and Lord Murugan statue"
            loading="lazy"
          />
          <span class="tag-badge">Sacred Sanctuary</span>
          <span class="region-badge">Selangor</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              Gombak
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.8 (31k Reviews)
            </span>
          </div>

          <h3 class="card-title">Batu Caves & Murugan Statue</h3>

          <p class="card-text">
            A 400-million-year-old limestone hill featuring a network
            of caves and Hindu shrines, guarded by the world's tallest
            gold statue of Lord Murugan and 272 rainbow-painted steps.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              Cultural Wonder
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- Landmark 3: Mount Kinabalu -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80"
            alt="Mount Kinabalu in Sabah, Borneo"
            loading="lazy"
          />
          <span class="tag-badge">UNESCO World Heritage</span>
          <span class="region-badge">Sabah, Borneo</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              Kinabalu Park
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.9 (18k Reviews)
            </span>
          </div>

          <h3 class="card-title">Mount Kinabalu</h3>

          <p class="card-text">
            Towering at 4,095 meters, the highest peak in Malaysia
            and Borneo holds sacred significance for local Kadazan-Dusun
            lore and boasts extraordinary botanical endemism.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              Alpine Adventure
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- Landmark 4: Kek Lok Si Temple -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1596423735880-5f2a689b90b8?auto=format&fit=crop&w=800&q=80"
            alt="Kek Lok Si Temple in Penang"
            loading="lazy"
          />
          <span class="tag-badge">Spiritual Monument</span>
          <span class="region-badge">Penang</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              Air Itam
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.7 (24k Reviews)
            </span>
          </div>

          <h3 class="card-title">Kek Lok Si Temple</h3>

          <p class="card-text">
            Known as the 'Temple of Supreme Bliss', it is one of
            Southeast Asia's largest Buddhist temples, featuring the
            seven-storey Ban Po Thar Pagoda and a massive bronze
            Kuan Yin statue.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              Heritage & Peace
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- Landmark 5: Langkawi Sky Bridge -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Langkawi and the Andaman Sea"
            loading="lazy"
          />
          <span class="tag-badge">Engineering Feat</span>
          <span class="region-badge">Kedah</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              Gunung Mat Cincang
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.8 (29k Reviews)
            </span>
          </div>

          <h3 class="card-title">Langkawi Sky Bridge</h3>

          <p class="card-text">
            Suspended above sea level atop ancient mountains, this
            125-meter curved pedestrian cable-stayed bridge offers
            sweeping panoramic vistas of the Andaman Sea and Thailand.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              Geopark Heights
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- Landmark 6: George Town Historic Quarter -->
      <article class="card">
        <div class="card-media">
          <img
            src="https://images.unsplash.com/photo-1565018054866-9b552d7ee856?auto=format&fit=crop&w=800&q=80"
            alt="George Town heritage shophouses"
            loading="lazy"
          />
          <span class="tag-badge">Living History</span>
          <span class="region-badge">Penang</span>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span>
              <i class="fa-solid fa-location-arrow"></i>
              George Town
            </span>
            <span>
              <i class="fa-solid fa-star"></i>
              4.9 (50k Reviews)
            </span>
          </div>

          <h3 class="card-title">George Town Historic Quarter</h3>

          <p class="card-text">
            Stroll through colonial-era shophouses, clan jetties,
            intricate Peranakan mansions, and world-renowned street
            art celebrating centuries of harmonious maritime trade.
          </p>

          <div class="card-footer">
            <span style="font-weight:700; color:var(--primary); font-size:0.9rem;">
              UNESCO Culture
            </span>
            <a href="#tours" class="explore-link">
              Details <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>

    </div>
  </main>
`;

export const bottomMarkup = `
  <!-- Peninsular Malaysia & Borneo Showcase -->
  <section id="destinations" class="experience-section">
    <div class="experience-wrapper">

      <div class="exp-content">
        <span
          class="section-subtitle"
          style="color:var(--accent-gold);"
        >
          Dual Enchantment
        </span>

        <h2>Peninsular Elegance, Wild Borneo Wonders</h2>

        <p>
          Whether you're exploring the bustling avenues of modern
          Kuala Lumpur, savoring street food in Penang, or venturing
          into the 130-million-year-old virgin rainforests of Sabah
          and Sarawak, every corner is an unforgettable journey.
        </p>

        <div class="exp-stats">
          <div class="stat-box">
            <h4>4+</h4>
            <p>UNESCO Sites</p>
          </div>

          <div class="stat-box">
            <h4>130M</h4>
            <p>Year Rainforests</p>
          </div>

          <div class="stat-box">
            <h4>878</h4>
            <p>Islands to Discover</p>
          </div>
        </div>

        <a class="btn btn-gold" href="#tours">
          <i class="fa-solid fa-map-location-dot"></i>
          Explore Malaysia Tours
        </a>
      </div>

      <div class="exp-image-stack">
        <img
          class="img-large"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Tropical rainforest scenery"
          loading="lazy"
        />

        <img
          class="img-floating"
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80"
          alt="Tropical islands in Southeast Asia"
          loading="lazy"
        />
      </div>

    </div>
  </section>

  <!-- Footer -->
  <footer id="culture">
    <div class="footer-grid">

      <!-- Brand and Social Media -->
      <div class="footer-col">
        <div class="brand" style="margin-bottom:16px;">
          <i class="fa-solid fa-spa brand-logo-icon"></i>
          <div class="brand-text">
            <h1>Malaysia</h1>
            <span>Truly Asia</span>
          </div>
        </div>

        <p style="font-size:0.95rem; line-height:1.7; max-width:320px;">
          Discover a warm and welcoming multicultural nation where
          tradition and tomorrow live side by side.
        </p>

        <div class="social-links">
          <a href="#" aria-label="Facebook">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="#" aria-label="X">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="#" aria-label="YouTube">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>

      <!-- Key Destinations -->
      <div class="footer-col">
        <h4>Key Destinations</h4>
        <ul>
          <li><a href="#landmarks">Kuala Lumpur</a></li>
          <li><a href="#landmarks">Penang Island</a></li>
          <li><a href="#destinations">Sabah & Kinabalu</a></li>
          <li><a href="#landmarks">Langkawi Geopark</a></li>
          <li><a href="#destinations">Melaka Heritage</a></li>
        </ul>
      </div>

      <!-- Travel Practicalities -->
      <div class="footer-col">
        <h4>Travel Practicalities</h4>
        <ul>
          <li><a href="#plan">Visa Requirements</a></li>
          <li><a href="#plan">Best Time to Visit</a></li>
          <li><a href="#plan">Getting Around (KTM & Flights)</a></li>
          <li><a href="#plan">Halal & Gastronomy Guide</a></li>
          <li><a href="#plan">Responsible Eco-Tourism</a></li>
        </ul>
      </div>

      <!-- Tourism Board -->
      <div class="footer-col">
        <h4>Tourism Board</h4>
        <ul>
          <li><a href="#culture">About Tourism Malaysia</a></li>
          <li><a href="#culture">Media Center & Press</a></li>
          <li><a href="#culture">Travel Trade Partners</a></li>
          <li><a href="#culture">Contact Support</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>
        &copy; 2026 Tourism Malaysia. All rights reserved.
        Designed for travelers worldwide.
      </p>
    </div>
  </footer>
`;

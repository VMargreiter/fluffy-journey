// pages/details.vue
<template>
  <div class="details-container">
    <GeometricPattern 
      :width="800" 
      :height="800" 
      position="absolute" 
      primaryColor="#2E7D32"
      secondaryColor="#4CAF50"
      accentColor="#8BC34A"
    />
    
    <div class="details-card">
      <h1>{{ coupleName }}</h1>
      <p class="tagline">We're getting married!</p>
      
      <div class="wedding-date">
        <div class="calendar-icon">
          <div class="month">{{ getMonth() }}</div>
          <div class="day">{{ getDay() }}</div>
        </div>
        <div class="date-details">
          <h2>{{ weddingDate }}</h2>
          <p>{{ weddingTime }}</p>
          <p v-if="countdown > 0">{{ countdown }} days to go!</p>
          <p v-else-if="countdown === 0">Today's the day!</p>
          <p v-else>Our special day has passed!</p>
        </div>
      </div>
      
      <section class="venue-section">
        <h2>Venue</h2>
        <div class="venue-details">
          <div class="venue-info">
            <h3>{{ venue.name }}</h3>
            <p>{{ venue.address }}</p>
            <p>{{ venue.city }}, {{ venue.state }} {{ venue.zip }}</p>
            <a :href="venue.mapLink" target="_blank" class="map-link">View on Map</a>
          </div>
          <div class="venue-image">
            <div class="image-placeholder">Venue Image</div>
          </div>
        </div>
      </section>
      
      <section class="schedule-section">
        <h2>Schedule</h2>
        <div class="timeline">
          <div class="timeline-item" v-for="(item, index) in schedule" :key="index">
            <div class="timeline-time">{{ item.time }}</div>
            <div class="timeline-content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div class="accordion">
          <div class="accordion-item" v-for="(item, index) in faqs" :key="index">
            <div 
              class="accordion-header" 
              :class="{ 'active': activeFaq === index }"
              @click="toggleFaq(index)"
            >
              <h3>{{ item.question }}</h3>
              <span class="accordion-icon">{{ activeFaq === index ? '−' : '+' }}</span>
            </div>
            <div class="accordion-content" :class="{ 'open': activeFaq === index }">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="rsvp-section">
        <h2>RSVP</h2>
        <p>We would be delighted to have you join us on our special day.</p>
        <nuxt-link to="/" class="rsvp-btn">RSVP Now</nuxt-link>
      </section>
    </div>
  </div>
</template>

<script>
import GeometricPattern from '../components/GeometricPattern.vue'

export default {
  components: {
    GeometricPattern
  },
  data() {
    return {
      coupleName: "Jazz & Val",
      weddingDate: "March 7, 2026",
      weddingTime: "4:00 PM",
      activeFaq: null,
      venue: {
        name: "Green Meadows Estate",
        address: "123 Wedding Lane",
        city: "Lakeside",
        state: "CA",
        zip: "92101",
        mapLink: "https://maps.google.com"
      },
      schedule: [
        {
          time: "3:30 PM",
          title: "Guest Arrival",
          description: "Welcome drinks will be served."
        },
        {
          time: "4:00 PM",
          title: "Ceremony",
          description: "The wedding ceremony will begin promptly."
        },
        {
          time: "4:45 PM",
          title: "Cocktail Hour",
          description: "Enjoy drinks and appetizers while we take photos."
        },
        {
          time: "6:00 PM",
          title: "Dinner Reception",
          description: "A seated dinner will be served."
        },
        {
          time: "7:30 PM",
          title: "Dancing",
          description: "Time to celebrate on the dance floor!"
        },
        {
          time: "11:00 PM",
          title: "Farewell",
          description: "Thank you for sharing our special day."
        }
      ],
      faqs: [
        {
          question: "What's the dress code?",
          answer: "The dress code is semi-formal. We recommend suits for men and cocktail dresses for women. The ceremony and reception will be held outdoors on grass, so please consider appropriate footwear."
        },
        {
          question: "Can I bring a plus one?",
          answer: "Due to venue capacity limitations, we can only accommodate those guests named on your invitation. Please indicate in your RSVP exactly who will be attending."
        },
        {
          question: "Is the venue accessible?",
          answer: "Yes, the venue is fully accessible for guests with mobility needs. If you require any specific accommodations, please let us know in the message section of your RSVP."
        },
        {
          question: "Are children welcome?",
          answer: "While we love your little ones, our wedding will be an adults-only celebration. We hope this gives you an opportunity to enjoy the evening while the kids have fun with a sitter."
        },
        {
          question: "What about gifts?",
          answer: "Your presence is the greatest gift of all. If you wish to honor us with a gift, we have created a registry at [Registry Website]."
        }
      ]
    }
  },
  computed: {
    countdown() {
      const today = new Date();
      const weddingDay = new Date(this.weddingDate);
      const timeDiff = weddingDay.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  },
  methods: {
    toggleFaq(index) {
      if (this.activeFaq === index) {
        this.activeFaq = null;
      } else {
        this.activeFaq = index;
      }
    },
    getMonth() {
      const date = new Date(this.weddingDate);
      return date.toLocaleString('default', { month: 'short' }).toUpperCase();
    },
    getDay() {
      const date = new Date(this.weddingDate);
      return date.getDate();
    }
  }
}
</script>

<style scoped>
.details-container {
  min-height: 100vh;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.details-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 2.5rem;
  color: #2E7D32;
  margin-bottom: 0.5rem;
  text-align: center;
}

.tagline {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2.5rem;
}

section {
  margin-bottom: 3rem;
}

h2 {
  color: #2E7D32;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #E8F5E9;
}

.wedding-date {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background-color: #E8F5E9;
  border-radius: 8px;
}

.calendar-icon {
  width: 80px;
  height: 90px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-shrink: 0;
}

.month {
  background-color: #2E7D32;
  color: white;
  padding: 0.3rem;
  font-weight: bold;
  font-size: 0.9rem;
}

.day {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.date-details h2 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1.8rem;
}

.date-details p {
  color: #666;
  margin-top: 0.5rem;
}

.venue-details {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.venue-info {
  flex: 1;
}

.venue-info h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.venue-image {
  flex: 1;
  min-width: 200px;
}

.image-placeholder {
  background-color: #E8F5E9;
  border-radius: 8px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2E7D32;
  font-weight: 500;
}

.map-link {
  display: inline-block;
  margin-top: 1rem;
  color: #2E7D32;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.map-link:hover {
  color: #1B5E20;
  text-decoration: underline;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px;
  width: 2px;
  background-color: #E8F5E9;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:before {
  content: '';
  position: absolute;
  top: 0.3rem;
  left: -2rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #4CAF50;
}

.timeline-time {
  font-weight: bold;
  color: #2E7D32;
  margin-bottom: 0.5rem;
}

.timeline-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.accordion-item {
  margin-bottom: 1rem;
  border: 1px solid #E8F5E9;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-header {
  padding: 1rem;
  background-color: #F1F8E9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;
}

.accordion-header:hover {
  background-color: #E8F5E9;
}

.accordion-header.active {
  background-color: #E8F5E9;
}

.accordion-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.accordion-icon {
  font-size: 1.5rem;
  color: #2E7D32;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.open {
  max-height: 500px;
}

.accordion-content p {
  padding: 1rem;
  margin: 0;
}

.rsvp-section {
  text-align: center;
}

.rsvp-btn {
  display: inline-block;
  background-color: #2E7D32;
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 1.5rem;
  transition: background-color 0.3s, transform 0.2s;
}

.rsvp-btn:hover {
  background-color: #1B5E20;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .details-card {
    padding: 2rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .venue-details {
    flex-direction: column;
  }
  
  .wedding-date {
    flex-direction: column;
    text-align: center;
  }
  
  .calendar-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
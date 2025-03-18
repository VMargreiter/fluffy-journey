<template>
  <div class="wedding-container">
    <div class="card" v-for="(item, index) in items" :key="index">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
    
    <UCard class="rsvp-card">
      <h1>{{ couple }} Wedding</h1>
      <p class="date">{{ weddingDate }}</p>
      
      <div class="wedding-date">
        <div class="calendar-icon">
          <div class="month">{{ getMonth() }}</div>
          <div class="day">{{ getDay() }}</div>
        </div>
        <div class="date-details">
          <h2>{{ weddingDate }}</h2>
          <p v-if="countdown > 0">{{ countdown }} days to go!</p>
          <p v-else-if="countdown === 0">Today's the day!</p>
          <p v-else>Our special day has passed!</p>
        </div>
      </div>
      
      <form @submit.prevent="submitRSVP" class="rsvp-form">
        <div v-if="!submitted">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              class="rsvp-input"
              v-model="rsvp.name" 
              required 
              placeholder="Enter your full name"
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="rsvp.email" 
              required 
              placeholder="Enter your email"
            />
          </div>
          
          <div class="form-group">
            <label>Attending?</label>
            <div class="radio-group">
              <label>
                <input type="radio" v-model="rsvp.attending" :value="true" name="attending" />
                Yes, I'll be there!
              </label>
              <label>
                <input type="radio" v-model="rsvp.attending" :value="false" name="attending" />
                Sorry, I can't make it
              </label>
            </div>
          </div>
          
          <div v-if="rsvp.attending" class="form-group">
            <label for="guests">Number of Guests (including yourself)</label>
            <input 
              type="number" 
              id="guests" 
              v-model.number="rsvp.guestCount" 
              min="1" 
              max="5"
            />
          </div>
          
          <div v-if="rsvp.attending" class="form-group">
            <label for="dietary">Dietary Restrictions</label>
            <textarea 
              id="dietary" 
              v-model="rsvp.dietaryRestrictions" 
              placeholder="Please let us know of any dietary restrictions"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="message">Message to the Couple (Optional)</label>
            <textarea 
              id="message" 
              v-model="rsvp.message" 
              placeholder="Share your wishes or message"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn">
            {{ rsvp.attending ? 'Confirm Attendance' : 'Send Response' }}
          </button>
        </div>
        
        <div v-else class="confirmation">
          <div class="check-icon">✓</div>
          <h2>Thank you for your response!</h2>
          <p v-if="rsvp.attending">We're excited to celebrate with you on our special day!</p>
          <p v-else>We're sorry you can't make it, but thank you for letting us know.</p>
          <button @click="resetForm" class="reset-btn">Submit Another Response</button>
        </div>
      </form>
      
      <div class="navigation-links">
        <nuxt-link to="/details" class="details-btn">View Wedding Details</nuxt-link>
      </div>
    </UCard>
  </div>
</template>

<script>
import { UCard } from '#components';

export default {
  components: {
    UCard,
  },
  data() {
    return {
      couple: "Jazz & Val",
      weddingDate: "March 7, 2026",
      rsvp: {
        name: '',
        email: '',
        attending: null,
        guestCount: 1,
        dietaryRestrictions: '',
        message: ''
      },
      submitted: false,
      loading: false,
      error: null,
      items: [
        { title: "Our Story", description: "How we met and fell in love" },
        { title: "Wedding Details", description: "Everything you need to know about our big day" },
        { title: "RSVP", description: "Let us know if you can make it!" }
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
    async submitRSVP() {
      try {
        this.loading = true;
        this.error = null;
        
        // Send data to PHP backend
        const response = await fetch('/api/rsvp.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.rsvp)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        
        // Success
        this.submitted = true;
      } catch (error) {
        this.error = error.message;
        alert('Error: ' + this.error);
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.rsvp = {
        name: '',
        email: '',
        attending: null,
        guestCount: 1,
        dietaryRestrictions: '',
        message: ''
      };
      this.submitted = false;
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
.wedding-container {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.rsvp-card {
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

h1 {
  font-size: 2.5rem;
  color: var(--primary);
  text-align: center;
  margin-bottom: 0.5rem;
}

.date {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.wedding-date {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background-color: var(--accent-bg);
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
  background-color: var(--primary);
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
  color: var(--text-primary);
}

.date-details h2 {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1.5rem;
  color: var(--primary-dark);
}

.date-details p {
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-top: 0.25rem;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px var(--accent-bg);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

.confirmation {
  text-align: center;
  padding: 2rem 0;
}

.check-icon {
  font-size: 3rem;
  color: var(--success);
  margin-bottom: 1rem;
  animation: scaleIn 0.5s ease-out;
}

.reset-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--text-secondary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: var(--text-primary);
}

.navigation-links {
  margin-top: 2rem;
  text-align: center;
}

.details-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-light);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
}

.details-btn:hover {
  background-color: var(--primary);
  transform: translateY(-2px);
}

@keyframes scaleIn {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 768px) {
  .rsvp-card {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .wedding-date {
    flex-direction: column;
    text-align: center;
  }
  
  .calendar-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
// pages/index.vue
<template>
  <div class="wedding-container">
    <div class="geometric-bg"></div>
    <div class="rsvp-card">
      <h1>{{ couple }} Wedding</h1>
      <p class="date">{{ weddingDate }}</p>
      
      <form @submit.prevent="submitRSVP" class="rsvp-form">
        <div v-if="!submitted">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couple: "Jane & John",
      weddingDate: "June 15, 2025",
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
      error: null
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
    }
  }
}
</script>

<style scoped>
.wedding-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.geometric-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(#4CAF50 2px, transparent 2px),
                    radial-gradient(#8BC34A 2px, transparent 2px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  opacity: 0.15;
  z-index: -1;
}

.geometric-bg::before, .geometric-bg::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px solid #4CAF50;
  transform: rotate(45deg);
  opacity: 0.2;
}

.geometric-bg::before {
  top: -100px;
  left: -100px;
}

.geometric-bg::after {
  bottom: -100px;
  right: -100px;
}

.rsvp-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  position: relative;
}

h1 {
  font-size: 2.2rem;
  color: #2E7D32;
  margin-bottom: 0.5rem;
  text-align: center;
}

.date {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
}

.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #333;
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.submit-btn, .reset-btn {
  background-color: #2E7D32;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.submit-btn:hover, .reset-btn:hover {
  background-color: #1B5E20;
}

.confirmation {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.check-icon {
  width: 70px;
  height: 70px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .rsvp-card {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
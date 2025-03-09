// pages/index.vue
<template>
  <div class="wedding-container bg-red">
    <UCard class="rsvp-card">
      <h1>{{ couple }} Wedding</h1>
      <p class="date">{{ weddingDate }}</p>
      
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
    </UCard>
  </div>
</template>

<script>
import { UCard } from '#components';

export default {
  components: {
    UCard
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
</style>
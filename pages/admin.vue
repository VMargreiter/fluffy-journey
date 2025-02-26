// pages/admin.vue
<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Wedding RSVP Admin</h1>
      <div class="stats-cards">
        <div class="stat-card">
          <h3>Total Responses</h3>
          <p class="stat-value">{{ totalResponses }}</p>
        </div>
        <div class="stat-card">
          <h3>Attending</h3>
          <p class="stat-value">{{ attendingCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Not Attending</h3>
          <p class="stat-value">{{ notAttendingCount }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Guests</h3>
          <p class="stat-value">{{ totalGuests }}</p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <p>Loading RSVPs...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchRSVPs" class="retry-btn">Retry</button>
    </div>
    
    <div v-else>
      <div class="filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchTerm" 
            placeholder="Search by name or email" 
            @input="applyFilters"
          />
        </div>
        
        <div class="filter-options">
          <label>
            <input 
              type="radio" 
              v-model="attendanceFilter" 
              value="all" 
              @change="applyFilters"
            /> 
            All
          </label>
          <label>
            <input 
              type="radio" 
              v-model="attendanceFilter" 
              value="attending" 
              @change="applyFilters"
            /> 
            Attending
          </label>
          <label>
            <input 
              type="radio" 
              v-model="attendanceFilter" 
              value="notAttending" 
              @change="applyFilters"
            /> 
            Not Attending
          </label>
        </div>
      </div>
      
      <div class="rsvp-table-container">
        <table class="rsvp-table">
          <thead>
            <tr>
              <th @click="sortBy('name')">
                Name 
                <span v-if="sortKey === 'name'" class="sort-indicator">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('email')">
                Email
                <span v-if="sortKey === 'email'" class="sort-indicator">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('attending')">
                Status
                <span v-if="sortKey === 'attending'" class="sort-indicator">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('guest_count')">
                Guests
                <span v-if="sortKey === 'guest_count'" class="sort-indicator">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="sortBy('created_at')">
                Date Submitted
                <span v-if="sortKey === 'created_at'" class="sort-indicator">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rsvp in filteredRSVPs" :key="rsvp.id">
              <td>{{ rsvp.name }}</td>
              <td>{{ rsvp.email }}</td>
              <td>
                <span 
                  :class="rsvp.attending ? 'status-attending' : 'status-not-attending'"
                >
                  {{ rsvp.attending ? 'Attending' : 'Not Attending' }}
                </span>
              </td>
              <td>{{ rsvp.guest_count }}</td>
              <td>{{ formatDate(rsvp.created_at) }}</td>
              <td>
                <button @click="viewDetails(rsvp)" class="details-btn">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredRSVPs.length === 0" class="no-results">
        <p>No RSVPs match your search criteria.</p>
      </div>
    </div>
    
    <!-- RSVP Details Modal -->
    <div v-if="selectedRSVP" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>RSVP Details</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-item">
            <h3>Name</h3>
            <p>{{ selectedRSVP.name }}</p>
          </div>
          <div class="detail-item">
            <h3>Email</h3>
            <p>{{ selectedRSVP.email }}</p>
          </div>
          <div class="detail-item">
            <h3>Status</h3>
            <p :class="selectedRSVP.attending ? 'status-attending' : 'status-not-attending'">
              {{ selectedRSVP.attending ? 'Attending' : 'Not Attending' }}
            </p>
          </div>
          <div v-if="selectedRSVP.attending" class="detail-item">
            <h3>Number of Guests</h3>
            <p>{{ selectedRSVP.guest_count }}</p>
          </div>
          <div v-if="selectedRSVP.attending && selectedRSVP.dietary_restrictions" class="detail-item">
            <h3>Dietary Restrictions</h3>
            <p>{{ selectedRSVP.dietary_restrictions || 'None specified' }}</p>
          </div>
          <div v-if="selectedRSVP.message" class="detail-item">
            <h3>Message</h3>
            <p>{{ selectedRSVP.message }}</p>
          </div>
          <div class="detail-item">
            <h3>Submitted On</h3>
            <p>{{ formatDate(selectedRSVP.created_at, true) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth', // You would need to implement auth middleware
  data() {
    return {
      rsvps: [],
      filteredRSVPs: [],
      isLoading: true,
      error: null,
      searchTerm: '',
      attendanceFilter: 'all',
      sortKey: 'created_at',
      sortOrder: 'desc',
      selectedRSVP: null
    }
  },
  computed: {
    totalResponses() {
      return this.rsvps.length;
    },
    attendingCount() {
      return this.rsvps.filter(r => r.attending).length;
    },
    notAttendingCount() {
      return this.rsvps.filter(r => !r.attending).length;
    },
    totalGuests() {
      return this.rsvps.reduce((total, rsvp) => total + (rsvp.attending ? rsvp.guest_count : 0), 0);
    }
  },
  mounted() {
    this.fetchRSVPs();
  },
  methods: {
    async fetchRSVPs() {
      try {
        this.isLoading = true;
        this.error = null;
        
        // Fetch RSVPs from backend
        const response = await fetch('/api/get-rsvps.php', {
          headers: {
            'Content-Type': 'application/json',
            // Add auth headers as needed
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSVPs');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Error fetching RSVPs');
        }
        
        this.rsvps = data.rsvps;
        this.applyFilters();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    
    applyFilters() {
      let filtered = [...this.rsvps];
      
      // Apply attendance filter
      if (this.attendanceFilter !== 'all') {
        const isAttending = this.attendanceFilter === 'attending';
        filtered = filtered.filter(rsvp => rsvp.attending === isAttending);
      }
      
      // Apply search filter
      if (this.searchTerm.trim()) {
        const term = this.searchTerm.toLowerCase();
        filtered = filtered.filter(rsvp => 
          rsvp.name.toLowerCase().includes(term) || 
          rsvp.email.toLowerCase().includes(term)
        );
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        let valueA = a[this.sortKey];
        let valueB = b[this.sortKey];
        
        // Handle special cases
        if (this.sortKey === 'created_at') {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }
        
        // Compare based on sort order
        if (this.sortOrder === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      this.filteredRSVPs = filtered;
    },
    
    sortBy(key) {
      // If clicking the same column, toggle sort order
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      
      this.applyFilters();
    },
    
    viewDetails(rsvp) {
      this.selectedRSVP = { ...rsvp };
    },
    
    closeModal() {
      this.selectedRSVP = null;
    },
    
    formatDate(dateString, includeTime = false) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }
      
      return date.toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  margin-bottom: 2rem;
}

.admin-header h1 {
  color: var(--primary-green);
  margin-bottom: 1.5rem;
  text-align: center;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-green);
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.filter-options {
  display: flex;
  gap: 1.5rem;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.rsvp-table-container {
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.rsvp-table {
  width: 100%;
  border-collapse: collapse;
}

.rsvp-table th, .rsvp-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.rsvp-table th {
  background-color: var(--very-light-green);
  font-weight: 600;
  color: var(--primary-green);
  cursor: pointer;
  user-select: none;
  position: relative;
}

.rsvp-table th:hover {
  background-color: #d7ecd8;
}

.sort-indicator {
  margin-left: 0.5rem;
}

.status-attending {
  color: var(--primary-green);
  font-weight: 500;
}

.status-not-attending {
  color: #f44336;
  font-weight: 500;
}

.details-btn {
  background-color: var(--primary-green);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-btn:hover {
  background-color: var(--dark-green);
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #f44336;
}

.retry-btn {
  margin-top: 1rem;
  background-color: var(--primary-green);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: var(--primary-green);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #555;
}

.modal-body {
  padding: 1.5rem;
}

.detail-item {
  margin-bottom: 1.5rem;
}

.detail-item h3 {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.3rem;
}

.detail-item p {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .admin-container {
    padding: 1rem;
  }
  
  .filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-options {
    justify-content: space-between;
  }
  
  .rsvp-table th, .rsvp-table td {
    padding: 0.8rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
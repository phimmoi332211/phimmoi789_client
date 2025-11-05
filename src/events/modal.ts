import { EventEmitter } from 'events';

class ModalEventEmitter extends EventEmitter {
  showLogin() {
    this.emit('showLogin');
  }

  showRegister() {
    this.emit('showRegister');
  }

  showPlaylist() {
    this.emit('showPlaylist');
  }

  showForgot() {
    this.emit('showForgot');
  }

  hideModals() {
    this.emit('hideModals');
  }
}

export const modalEvent = new ModalEventEmitter(); 

// Event system cho rating
export const ratingEvent = {
  listeners: new Set<(review: any) => void>(),
  
  emit(review: any) {
    this.listeners.forEach(listener => listener(review));
  },
  
  subscribe(listener: (review: any) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}; 
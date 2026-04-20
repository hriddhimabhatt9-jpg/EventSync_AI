import { events, speakers, scheduleItems, trendingEvents } from './mock-data';

describe('Mock Data Integrity', () => {
  it('events array should contain data', () => {
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });

  it('featured event should be marked as featured', () => {
    const featured = events.find(e => e.isFeatured);
    expect(featured).toBeDefined();
    // Assuming our mock data has a specific featured event title based on our dump
    expect(featured?.title).toContain('NeuralSync'); 
  });

  it('trending events should have expected shape', () => {
    expect(Array.isArray(trendingEvents)).toBe(true);
    expect(trendingEvents.length).toBeGreaterThan(0);
    expect(trendingEvents[0]).toHaveProperty('title');
    expect(trendingEvents[0]).toHaveProperty('location');
    expect(trendingEvents[0]).toHaveProperty('price');
  });

  it('speakers should have required fields', () => {
    expect(speakers.length).toBeGreaterThan(0);
    speakers.forEach(speaker => {
      expect(speaker).toHaveProperty('id');
      expect(speaker).toHaveProperty('name');
      expect(speaker).toHaveProperty('role');
    });
  });

  it('schedule items should have time and title', () => {
    expect(scheduleItems.length).toBeGreaterThan(0);
    scheduleItems.forEach(item => {
      expect(item).toHaveProperty('time');
      expect(item).toHaveProperty('title');
    });
  });
});

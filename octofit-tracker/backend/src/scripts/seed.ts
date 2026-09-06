import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, jordan, sam] = await User.create([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Runner',
      },
      {
        username: 'jordan.lifts',
        email: 'jordan.lifts@example.com',
        displayName: 'Jordan Lifts',
      },
      {
        username: 'sam.cycles',
        email: 'sam.cycles@example.com',
        displayName: 'Sam Cycles',
      },
    ]);

    const [trailblazers, powerCrew] = await Team.create([
      {
        name: 'Trailblazers',
        description: 'A team focused on consistent outdoor activity.',
        memberIds: [alex._id, sam._id],
      },
      {
        name: 'Power Crew',
        description: 'A team focused on strength and conditioning.',
        memberIds: [jordan._id],
      },
    ]);

    await User.bulkSave([
      Object.assign(alex, { teamId: trailblazers._id }),
      Object.assign(jordan, { teamId: powerCrew._id }),
      Object.assign(sam, { teamId: trailblazers._id }),
    ]);

    await Activity.create([
      {
        userId: alex._id,
        type: 'Running',
        durationMinutes: 35,
        calories: 320,
        completedAt: new Date('2026-09-01T07:30:00Z'),
      },
      {
        userId: jordan._id,
        type: 'Strength training',
        durationMinutes: 45,
        calories: 280,
        completedAt: new Date('2026-09-02T17:00:00Z'),
      },
      {
        userId: sam._id,
        type: 'Cycling',
        durationMinutes: 50,
        calories: 410,
        completedAt: new Date('2026-09-03T06:45:00Z'),
      },
    ]);

    await Leaderboard.create([
      { userId: alex._id, points: 920, rank: 1 },
      { userId: sam._id, points: 860, rank: 2 },
      { userId: jordan._id, points: 740, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Morning Momentum',
        description: 'A balanced routine to start the day with energy.',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Bodyweight squats', 'Push-ups', 'Plank'],
      },
      {
        name: 'Full Body Builder',
        description: 'A progressive full-body strength session.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: ['Goblet squats', 'Dumbbell rows', 'Lunges', 'Shoulder press'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

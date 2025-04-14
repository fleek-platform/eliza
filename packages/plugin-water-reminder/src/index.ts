import { ServiceType } from '@elizaos/core';
import cron from 'node-cron';
import twilio from 'twilio';
import type { IAgentRuntime, Reminder } from './types';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

class WaterReminderService {
  serviceType = 'water_reminder';
  runtime: IAgentRuntime | null = null;
  initialized: boolean = false;

  constructor() {
    this.serviceType = 'water_reminder';
  }

  async initialize(runtime: IAgentRuntime) {
    if (this.initialized) return;
    this.runtime = runtime;
    this.scheduleReminders();
    this.initialized = true;
    console.info('WaterReminderService initialized');
  }

  scheduleReminders() {
    const character = this.runtime?.character;
    if (!this.runtime || !character?.schedule?.smsReminders) {
      console.warn('No schedule or runtime found for water reminders');
      return;
    }

    const reminders: Reminder[] = character.schedule.smsReminders;
    const targetNumber = character.schedule.targetPhoneNumber || ''; // Default to empty string if undefined
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

    if (!targetNumber) {
      console.warn('No target phone number provided; skipping SMS scheduling');
      return;
    }

    reminders.forEach((reminder: Reminder) => {
      const [hour, minute] = reminder.time.split(':');
      cron.schedule(`${minute} ${hour} * * *`, async () => {
        console.info(`Sending SMS at ${hour}:${minute} NY to ${targetNumber}`);
        try {
          const message = await twilioClient.messages.create({
            to: targetNumber,
            from: fromNumber,
            body: reminder.message
          });
          console.info(`Sent SMS: "${reminder.message}" (SID: ${message.sid})`);
        } catch (error) {
          console.error(`Failed to send SMS:`, error);
        }
      }, { timezone: 'America/New_York' });
    });
    console.info(`Scheduled ${reminders.length} water reminders`);
  }

  isInitialized() {
    return this.initialized;
  }
}

export const plugin = {
  name: '@elizaos/plugin-water-reminder',
  description: 'Sends scheduled water reminders via SMS using Twilio',
  actions: [],
  evaluators: [],
  providers: [],
  services: [new WaterReminderService()]
};

console.log('🔌 Water Reminder Plugin Loaded:', plugin);

export default plugin;
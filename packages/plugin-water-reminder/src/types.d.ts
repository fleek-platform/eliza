export interface IAgentRuntime {
  character: {
    schedule?: {
      smsReminders?: Array<{ time: string; message: string }>;
      targetPhoneNumber?: string;
    };
  };
}

export interface Reminder {
  time: string;
  message: string;
}
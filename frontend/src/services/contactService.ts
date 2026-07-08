import { api } from '../utils/api';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface Contact extends ContactData {
  _id: string;
  status: 'unread' | 'read' | 'responded';
  createdAt: string;
}

export const contactService = {
  async submitContact(data: ContactData): Promise<Contact> {
    const response = await api.request('/contact', {
      method: 'POST',
      body: data,
    });
    return response;
  },
}; 
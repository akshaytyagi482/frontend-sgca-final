import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../context/context';

export function ContactInfo({ contactData: propContactData }: { contactData?: any }) {
  const { data } = useData();
  const defaultContactData = data?.siteData?.contact;
  const finalContactData = propContactData || defaultContactData;

  if (!finalContactData) return null;

  const contactItems = Array.isArray(finalContactData) ? finalContactData.map(item => {
    let icon;
    switch (item.icon) {
      case 'mail':
        icon = Mail;
        break;
      case 'phone':
        icon = Phone;
        break;
      case 'map-pin':
        icon = MapPin;
        break;
      default:
        icon = Mail;
    }
    return {
      icon,
      title: item.title,
      content: item.type === 'address' ? [item.value.line1, item.value.line2] : item.value
    };
  }) : [
    {
      icon: Mail,
      title: 'Email',
      content: finalContactData.email
    },
    {
      icon: Phone,
      title: 'Phone',
      content: finalContactData.phone
    },
    {
      icon: MapPin,
      title: 'Address',
      content: [finalContactData.address.line1, finalContactData.address.line2]
    }
  ];

  return (
    <div className="space-y-8">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
              {Array.isArray(item.content) ? (
                item.content.map((line, i) => (
                  <p key={i} className="mt-1 text-gray-500">{line}</p>
                ))
              ) : (
                <p className="mt-1 text-gray-500">{item.content}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Lock, Database, Eye, Share2, Bell, Clock, Trash2 } from 'lucide-react';

const PolicySection = ({ icon: Icon, title, children }) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <Icon className="w-6 h-6 text-blue-500" />
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="prose prose-blue max-w-none">
      {children}
    </CardContent>
  </Card>
);

const PrivacyPolicy = () => {
  const lastUpdated = "March 18, 2024";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="prose max-w-none pt-6">
            <p className="text-gray-700">
              Welcome to HydroControl. We understand the importance of protecting your personal information
              and are committed to maintaining the privacy and security of your data. This Privacy Policy
              explains how we collect, use, and safeguard your information when you use our hydroponic
              control system.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <PolicySection icon={Database} title="Information We Collect">
          <h3 className="text-lg font-semibold mb-2">System Data:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Environmental readings (temperature, humidity, pH levels)</li>
            <li>Equipment operation status and history</li>
            <li>System performance metrics</li>
            <li>Maintenance logs and schedules</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2 mt-4">User Data:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (username, email address)</li>
            <li>System preferences and settings</li>
            <li>Usage patterns and interaction history</li>
            <li>Technical data (IP address, device information)</li>
          </ul>
        </PolicySection>

        {/* Data Usage */}
        <PolicySection icon={Eye} title="How We Use Your Information">
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Operating and maintaining your hydroponic system</li>
            <li>Providing system notifications and alerts</li>
            <li>Improving system performance and user experience</li>
            <li>Analyzing usage patterns for system optimization</li>
            <li>Troubleshooting technical issues</li>
          </ul>
        </PolicySection>

        {/* Data Sharing */}
        <PolicySection icon={Share2} title="Information Sharing">
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers who assist in operating our system</li>
            <li>Analytics partners who help us improve our services</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </PolicySection>

        {/* Data Security */}
        <PolicySection icon={Lock} title="Data Security">
          <p>We implement various security measures to protect your information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication measures</li>
            <li>Secure data backup and recovery procedures</li>
          </ul>
        </PolicySection>

        {/* Data Retention */}
        <PolicySection icon={Clock} title="Data Retention">
          <p>We retain your data for as long as necessary to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide our services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
          </ul>
        </PolicySection>

        {/* User Rights */}
        <PolicySection icon={Shield} title="Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data</li>
            <li>Opt-out of non-essential data collection</li>
          </ul>
        </PolicySection>

        {/* Updates */}
        <PolicySection icon={Bell} title="Policy Updates">
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or for
            other operational, legal, or regulatory reasons. We will notify you of any material changes
            through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email notifications</li>
            <li>System notifications</li>
            <li>Website announcements</li>
          </ul>
        </PolicySection>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardContent className="prose max-w-none pt-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: privacy@hydrocontrol.com</li>
              <li>Address: [Your Company Address]</li>
              <li>Phone: [Your Phone Number]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
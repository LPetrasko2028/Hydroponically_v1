import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Scale,
  Book,
  ShieldAlert,
  AlertCircle,
  FileWarning,
  Ban,
  UserCog,
  Globe,
  HandCoins,
  Power,
  Gavel
} from 'lucide-react';

const TermsSection = ({ icon: Icon, title, children }) => (
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

const TermsOfService = () => {
  const lastUpdated = "March 18, 2024";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="prose max-w-none pt-6">
            <p className="text-gray-700">
              Welcome to HydroControl. By accessing or using our hydroponic control system and related services,
              you agree to be bound by these Terms of Service. Please read these terms carefully before using
              our system.
            </p>
          </CardContent>
        </Card>

        {/* Definitions */}
        <TermsSection icon={Book} title="Definitions">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>&quot;Service&quot;</strong> refers to the HydroControl hydroponic control system and related software</li>
            <li><strong>&quot;User&quot;</strong> refers to any individual or entity using our Service</li>
            <li><strong>&quot;System&quot;</strong> refers to the hardware and software components of the hydroponic control system</li>
            <li><strong>&quot;Data&quot;</strong> refers to any information collected or generated through the use of our Service</li>
          </ul>
        </TermsSection>

        {/* License and Usage */}
        <TermsSection icon={Scale} title="License and Usage Rights">
          <p>By subscribing to our Service, you are granted a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Non-exclusive, non-transferable license to use the Service</li>
            <li>Right to access and use the system for personal or business use</li>
            <li>License to use any related documentation and resources</li>
          </ul>
          
          <p className="mt-4">You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Modify, reverse engineer, or decompile the system</li>
            <li>Share or transfer your license to others</li>
            <li>Use the system for unauthorized purposes</li>
            <li>Attempt to bypass security measures</li>
          </ul>
        </TermsSection>

        {/* User Responsibilities */}
        <TermsSection icon={UserCog} title="User Responsibilities">
          <p>As a user of our Service, you are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintaining the security of your account credentials</li>
            <li>Ensuring proper system maintenance and cleaning</li>
            <li>Following recommended safety guidelines</li>
            <li>Reporting any system malfunctions or security issues</li>
            <li>Maintaining appropriate environmental conditions</li>
            <li>Backing up your data regularly</li>
          </ul>
        </TermsSection>

        {/* System Usage and Safety */}
        <TermsSection icon={ShieldAlert} title="System Safety and Security">
          <p>For safe operation of the system:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Follow all safety protocols and guidelines</li>
            <li>Use appropriate protective equipment when handling chemicals</li>
            <li>Maintain proper ventilation in the growing area</li>
            <li>Keep electrical components away from water</li>
            <li>Regularly inspect and maintain all equipment</li>
          </ul>
        </TermsSection>

        {/* Payment Terms */}
        <TermsSection icon={HandCoins} title="Payment and Subscription">
          <ul className="list-disc pl-6 space-y-2">
            <li>Subscription fees are billed according to your selected plan</li>
            <li>Payments are non-refundable unless required by law</li>
            <li>We reserve the right to modify pricing with notice</li>
            <li>Failed payments may result in service interruption</li>
          </ul>
        </TermsSection>

        {/* Data and Privacy */}
        <TermsSection icon={Globe} title="Data Usage and Privacy">
          <ul className="list-disc pl-6 space-y-2">
            <li>We collect and process data as outlined in our Privacy Policy</li>
            <li>You retain ownership of your cultivation data</li>
            <li>We may use anonymized data for system improvements</li>
            <li>Data security measures are implemented as described in our Security Policy</li>
          </ul>
        </TermsSection>

        {/* Limitations */}
        <TermsSection icon={Ban} title="Limitations and Restrictions">
          <p>The Service may not be used for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Any illegal activities or substances</li>
            <li>Unauthorized commercial purposes</li>
            <li>Activities that violate local regulations</li>
            <li>Purposes that may harm the system or other users</li>
          </ul>
        </TermsSection>

        {/* Liability */}
        <TermsSection icon={AlertCircle} title="Limitation of Liability">
          <p>HydroControl is not liable for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Crop failure or loss of produce</li>
            <li>System downtime or technical issues</li>
            <li>Damage caused by improper use</li>
            <li>Indirect or consequential damages</li>
            <li>Issues arising from third-party components</li>
          </ul>
        </TermsSection>

        {/* Termination */}
        <TermsSection icon={Power} title="Account Termination">
          <p>We may terminate or suspend access to our Service:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>For violation of these terms</li>
            <li>Non-payment of fees</li>
            <li>Suspicious or harmful activities</li>
            <li>Upon user request</li>
          </ul>
        </TermsSection>

        {/* Changes to Terms */}
        <TermsSection icon={FileWarning} title="Changes to Terms">
          <p>
            We reserve the right to modify these terms at any time. Users will be notified of significant
            changes through:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email notifications</li>
            <li>System announcements</li>
            <li>Website updates</li>
          </ul>
        </TermsSection>

        {/* Governing Law */}
        <TermsSection icon={Gavel} title="Governing Law">
          <p>
            These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
            without regard to its conflict of law provisions.
          </p>
        </TermsSection>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardContent className="prose max-w-none pt-6">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none space-y-2">
              <li>Email: legal@hydrocontrol.com</li>
              <li>Address: [Your Company Address]</li>
              <li>Phone: [Your Phone Number]</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
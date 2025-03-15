import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from '@/components/ui/card';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { Button } from '@/components/ui/button';

const DeleteAccountComponent = () => {
  return (
    <Card className="p-0 mb-6">
      <Accordion type="single" collapsible className="w-full p-0">
        <AccordionItem value="delete-account">
          <AccordionTrigger className="m-2 p-0">
            <CardHeader>
              <CardTitle>Delete Account</CardTitle>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="space-y-4"></CardContent>
            <CardFooter>
              <Button className="w-full">Delete Account</Button>
            </CardFooter>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default DeleteAccountComponent
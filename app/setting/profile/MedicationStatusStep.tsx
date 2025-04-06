import { Button } from "@/components/ui/button";
import React from "react";

type MedicationStatusStepProps = {
  onNext: () => void;
};

const MedicationStatusStep = ({ onNext }: MedicationStatusStepProps) => {
  return <Button onClick={onNext}>MedicationStatusStep</Button>;
};

export default MedicationStatusStep;

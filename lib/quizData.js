export const quizTitle = 'AWS Solutions Architect — Resilient Design Practice';
export const quizDescription =
  'A small starter quiz app built with Next.js. Select an answer, submit, and review explanations.';

export const questions = [
  {
    question:
      'Which AWS design choice best improves resilience for a web application that must stay available during an Availability Zone failure?',
    options: [
      'Run all instances in a single Availability Zone',
      'Deploy across multiple Availability Zones behind a load balancer',
      'Store the application on an EC2 instance with a larger EBS volume',
      'Use a single Route 53 record with no health checks',
    ],
    correctAnswer: 'Deploy across multiple Availability Zones behind a load balancer',
    explanation:
      'Spreading the workload across multiple Availability Zones removes a single-AZ dependency and improves fault tolerance.',
  },
  {
    question:
      'What is the most resilient way to store static objects that need highly durable availability?',
    options: [
      'Amazon S3 with versioning enabled',
      'Amazon EBS attached to one EC2 instance',
      'Instance store on a single server',
      'A temporary local cache on the application server',
    ],
    correctAnswer: 'Amazon S3 with versioning enabled',
    explanation:
      'Amazon S3 is designed for very high durability and availability, and versioning adds protection against accidental overwrites or deletes.',
  },
  {
    question:
      'Which AWS feature helps automatically reroute traffic away from an unhealthy endpoint?',
    options: [
      'Route 53 health checks with failover routing',
      'Security groups',
      'CloudWatch Logs',
      'AWS Trusted Advisor',
    ],
    correctAnswer: 'Route 53 health checks with failover routing',
    explanation:
      'Route 53 health checks can evaluate endpoint health and shift traffic to a healthy target using failover routing policies.',
  },
  {
    question:
      'For a critical relational database, which configuration best supports high availability and automatic recovery?',
    options: [
      'Single-AZ Amazon RDS instance',
      'Multi-AZ Amazon RDS deployment',
      'A database running only on an EC2 instance',
      'A manual backup stored on the same server',
    ],
    correctAnswer: 'Multi-AZ Amazon RDS deployment',
    explanation:
      'Multi-AZ RDS maintains a synchronous standby in another Availability Zone and supports automatic failover.',
  },
  {
    question:
      'Which approach is best for protecting against accidental deletion of an S3 object version?',
    options: [
      'Enable S3 Versioning and MFA Delete',
      'Use a larger bucket name',
      'Store the object in one Region only',
      'Disable lifecycle policies',
    ],
    correctAnswer: 'Enable S3 Versioning and MFA Delete',
    explanation:
      'Versioning preserves older versions, and MFA Delete adds a stronger safeguard for destructive actions.',
  },
];


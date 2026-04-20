export type Category = 'All' | 'Electrical' | 'Mechanical' | 'Civil' | 'Woodworking' | 'Dev' | 'AI/ML' | 'Financial' | 'General';

export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  category: Category;
}

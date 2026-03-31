import type { Project } from "./types";
import { buildingPermitsProject } from "./projects/building-permits";
import { surveyExplorerProject } from "./projects/survey-explorer";
import { salesDashboardProject } from "./projects/sales-dashboard";

const ALL_PROJECTS: Project[] = [
  buildingPermitsProject,
  surveyExplorerProject,
  salesDashboardProject,
];

export function getAllProjects(): Project[] {
  return ALL_PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectStepIndex(slug: string, stepId: string): number {
  const project = getProjectBySlug(slug);
  if (!project) return -1;
  return project.steps.findIndex((s) => s.id === stepId);
}

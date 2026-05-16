// Builds a challenge validator from lesson data. The validator body comes
// from repo-controlled lesson files (not user input), same trust model as
// the original LessonView implementation. Aliased constructor keeps the
// dynamic-eval surface explicit and intentional.
const DynamicFn = Function as unknown as new (
  ...args: string[]
) => (output: string, locals: Record<string, unknown>) => boolean;

export function createValidator(
  validateFnString: string,
): (output: string, locals: Record<string, unknown>) => boolean {
  return new DynamicFn("output", "locals", validateFnString);
}

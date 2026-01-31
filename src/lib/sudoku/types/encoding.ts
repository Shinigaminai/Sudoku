export type SolutionB64 = string;
export type InitMaskB64 = string;

export interface EncodedSudoku {
	solutionB64: SolutionB64;
	initMaskB64: InitMaskB64;
}

import {
  Fade,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useSelector } from 'react-redux';

import styles from './styles';

const SyllabusGeneratorResponse = () => {
  const { response } = useSelector((state) => state.tools);

  const renderTable = () => {
    return (
      <TableContainer
        component={Paper}
        sx={{ background: 'none', boxShadow: 'none' }}
      >
        <Table sx={{ background: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell>Section</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Course Title</TableCell>
              <TableCell>{response.course_information.course_title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Grade Level</TableCell>
              <TableCell>{response.course_information.grade_level}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{response.course_information.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instructor Name</TableCell>
              <TableCell>{response.instructor_information.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instructor Title</TableCell>
              <TableCell>{response.instructor_information.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Objectives</TableCell>
              <TableCell>
                <ul>
                  {response.course_description_objectives.objectives.map(
                    (objective, index) => (
                      <li key={index}>{objective}</li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.lastRowCellProps}>
                Learning Outcomes
              </TableCell>
              <TableCell sx={styles.lastRowCellProps}>
                <ul>
                  {response.course_description_objectives.intended_learning_outcomes.map(
                    (outcome, index) => (
                      <li key={index}>{outcome}</li>
                    )
                  )}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Fade in>
      <Grid {...styles.mainGridProps}>{renderTable()}</Grid>
    </Fade>
  );
};

export default SyllabusGeneratorResponse;

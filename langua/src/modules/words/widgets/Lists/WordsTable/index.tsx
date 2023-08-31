import { Word } from '@/modules/words/types/model';
import { bgBlur } from '@/share/utils/cssStyles';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, styled, alpha } from '@mui/material'
import React from 'react'

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface WordsTableProps
{
  data:Word[];
  actions?: (word:Word) => React.ReactNode;
  count:number;
  rowsPerPage:number;
  page:number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const WordsTable:React.FC<WordsTableProps>= ({data,actions,...paginationProps}) => {
  return (
  <>
    <TableContainer component={Paper}>
      <Table size={'small'} sx={{ minWidth: 650,width:'100%'}} >
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell align="right">Transcription</TableCell>
            <TableCell align="right">Translation</TableCell>
            {actions ? <TableCell align="right">Actions</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow 
              key={item.id}
              sx={(theme) => ({ 
                  backdropFilter: `blur(${5}px)`,
                  WebkitBackdropFilter: `blur(${5}px)`,
                  '&:nth-of-type(odd)': {
                    backgroundColor: alpha(item.wordToVocabulary?.[0]?.isFinished ? theme.palette.primary.light : theme.palette.action.hover, 0.3),
                  },
                  backgroundColor: alpha(item.wordToVocabulary?.[0]?.isFinished ? theme.palette.primary.light : theme.palette.action.hover, 0.3),

                '&:last-child td, &:last-child th': { border: 0 },
             })}
            >
              <TableCell>
                {item.word}
              </TableCell>
              <TableCell align="right">{item.transcription}</TableCell>
              <TableCell align="right">{item.translation}</TableCell>
              {actions ? <TableCell sx={{display:'flex',justifyItems:'end'}} align="right">{actions(item)}</TableCell> : null} 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      {...paginationProps}
    />
  </>
  )
}

export default WordsTable
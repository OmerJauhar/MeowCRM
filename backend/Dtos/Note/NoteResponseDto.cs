using System.Collections.Generic;
using backend.Dtos.Common;
using backend.Dtos.Note;

namespace backend.Dtos.Note
{
    public class NoteResponseDto : PagedResponseDto<NoteDto>
    {
        public Dictionary<string, int> CategoryCounts { get; set; }
        public Dictionary<string, int> PriorityCounts { get; set; }
        public int TotalPrivateNotes { get; set; }
        public int TotalPublicNotes { get; set; }
        public int NotesWithAiSummary { get; set; }
        public int AverageNoteLength { get; set; }
        public Dictionary<string, int> TagCounts { get; set; }
    }
} 
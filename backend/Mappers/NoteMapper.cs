using System;
using System.Collections.Generic;
using System.Linq;
using backend.Models;
using backend.Dtos.Note;

namespace backend.Mappers
{
    public static class NoteMapper
    {
        public static NoteDto ToDto(this Note note)
        {
            if (note == null) return null;

            return new NoteDto
            {
                Id = note.Id,
                CustomerId = note.CustomerId,
                Content = note.Content,
                CreatedDate = note.CreatedDate
            };
        }

        public static Note ToModel(this CreateNoteDto dto)
        {
            if (dto == null) return null;

            return new Note
            {
                CustomerId = dto.CustomerId,
                Content = dto.Content,
                CreatedDate = DateTime.UtcNow
            };
        }

        public static Note ToModel(this UpdateNoteDto dto, Note existingNote)
        {
            if (dto == null || existingNote == null) return null;

            existingNote.Content = dto.Content ?? existingNote.Content;

            return existingNote;
        }

        public static List<NoteDto> ToDtoList(this IEnumerable<Note> notes)
        {
            return notes?.Select(n => n.ToDto()).ToList();
        }
    }
} 
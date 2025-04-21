using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Dtos.Activity;

namespace backend.Mappers
{
    public static class ActivityMapper
    {
        public static ActivityDto ToActivityDto(this Activity activity)
        {
            if (activity == null) return null;

            return new ActivityDto
            {
                Id = activity.Id,
                CustomerId = activity.CustomerId,
                UserId = activity.UserId,
                Type = activity.Type,
                Description = activity.Description,
                Date = activity.Date,
                AiSummary = activity.AiSummary
            };
        }

        public static Activity ToActivityFromCreateDto(this CreateActivityDto activityDto)
        {
            if (activityDto == null) return null;

            return new Activity
            {
                CustomerId = activityDto.CustomerId,
                UserId = activityDto.UserId,
                Type = activityDto.Type,
                Description = activityDto.Description,
                Date = activityDto.Date,
                AiSummary = activityDto.AiSummary
            };
        }

        public static Activity ToActivityFromUpdateDto(this UpdateActivityDto activityDto, int id)
        {
            if (activityDto == null) return null;

            return new Activity
            {
                Id = id,
                Type = activityDto.Type,
                Description = activityDto.Description,
                Date = activityDto.Date,
                AiSummary = activityDto.AiSummary
            };
        }

        public static Activity ToModel(this UpdateActivityDto dto, Activity existingActivity)
        {
            if (dto == null || existingActivity == null) return null;

            existingActivity.Description = dto.Description ?? existingActivity.Description;
            if (dto.Date != DateTime.MinValue)
{
    existingActivity.Date = dto.Date;
}

            existingActivity.AiSummary = dto.AiSummary ?? existingActivity.AiSummary;

            return existingActivity;
        }

        public static List<ActivityDto> ToActivityDtoList(this IEnumerable<Activity> activities)
        {
            return activities?.Select(a => a.ToActivityDto()).ToList();
        }
    }
}
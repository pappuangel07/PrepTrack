
const sectionStyle = {
  background: "var(--card, #ffffff)",
  border: "1px solid var(--border, #e5e7eb)",
  borderRadius: "12px",
  padding: "18px",
  marginBottom: "18px",
};

const headingStyle = {
  fontSize: "21px",
  fontWeight: "700",
  marginBottom: "12px",
};

const codeStyle = {
  background: "var(--code-bg, #f3f4f6)",
  color: "var(--text, #111827)",
  padding: "14px",
  borderRadius: "8px",
  overflowX: "auto",
  whiteSpace: "pre",
  fontSize: "13px",
  lineHeight: "1.6",
};

const lessons = [
  {
    title: "1. Why Do We Need the Date & Time API?",
    content: (
      <>
        <p>Java programs often need to work with dates and time:</p>
        <ul>
          <li>Calculate a person's age.</li>
          <li>Find the number of days between two dates.</li>
          <li>Store when a task was created.</li>
          <li>Schedule meetings and reminders.</li>
          <li>Convert time between different time zones.</li>
        </ul>
        <p>
          Before Java 8, developers commonly used <code>Date</code> and{" "}
          <code>Calendar</code> from <code>java.util</code>. These older APIs
          have confusing behavior and mutable objects.
        </p>
        <p>
          Java 8 introduced the modern <code>java.time</code> package. It
          provides clearer, immutable, and thread-safe date/time classes.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();

        System.out.println(today);
    }
}`,
  },
  {
    title: "2. Important Classes in java.time",
    content: (
      <>
        <p>Choose the class based on what information you need.</p>
        <ul>
          <li>
            <code>LocalDate</code> — date only: year, month, day.
          </li>
          <li>
            <code>LocalTime</code> — time only: hour, minute, second.
          </li>
          <li>
            <code>LocalDateTime</code> — date and time, without a time zone.
          </li>
          <li>
            <code>ZonedDateTime</code> — date and time with a time zone.
          </li>
          <li>
            <code>Instant</code> — a specific point on the UTC timeline.
          </li>
          <li>
            <code>Duration</code> — a time-based amount.
          </li>
          <li>
            <code>Period</code> — a date-based amount in years, months, days.
          </li>
        </ul>
      </>
    ),
    code: `import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        LocalDateTime dateTime = LocalDateTime.now();

        System.out.println(date);
        System.out.println(time);
        System.out.println(dateTime);
    }
}`,
  },
  {
    title: "3. LocalDate — Working with Dates",
    content: (
      <>
        <p>
          <code>LocalDate</code> stores a date without a time or time zone.
        </p>
        <p>Its format is usually YYYY-MM-DD.</p>
        <p>You can create a specific date using <code>of()</code>.</p>
      </>
    ),
    code: `import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();

        LocalDate birthday =
            LocalDate.of(2007, 5, 20);

        System.out.println(today);
        System.out.println(birthday);

        System.out.println(birthday.getYear());
        System.out.println(birthday.getMonth());
        System.out.println(birthday.getDayOfMonth());
    }
}`,
  },
  {
    title: "4. LocalDate — Adding and Subtracting",
    content: (
      <>
        <p>Common methods:</p>
        <ul>
          <li><code>plusDays()</code></li>
          <li><code>minusDays()</code></li>
          <li><code>plusMonths()</code></li>
          <li><code>minusMonths()</code></li>
          <li><code>plusYears()</code></li>
          <li><code>minusYears()</code></li>
        </ul>
        <p>
          Important: date/time objects are immutable. These methods return a
          new object; they do not change the original date.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date =
            LocalDate.of(2026, 11, 24);

        LocalDate nextWeek =
            date.plusDays(7);

        LocalDate previousMonth =
            date.minusMonths(1);

        System.out.println(date);
        System.out.println(nextWeek);
        System.out.println(previousMonth);
    }
}`,
  },
  {
    title: "5. LocalDate — Changing Specific Parts",
    content: (
      <>
        <p>
          Use <code>with...</code> methods to create a date with a particular
          field changed.
        </p>
        <ul>
          <li><code>withYear()</code></li>
          <li><code>withMonth()</code></li>
          <li><code>withDayOfMonth()</code></li>
        </ul>
        <p>
          If the new date is invalid, Java throws a date-related exception.
          For example, February 30 does not exist.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date =
            LocalDate.of(2026, 11, 24);

        LocalDate changed =
            date.withMonth(12);

        System.out.println(date);
        System.out.println(changed);
    }
}`,
  },
  {
    title: "6. LocalTime — Working with Time",
    content: (
      <>
        <p>
          <code>LocalTime</code> stores time without a date or time zone.
        </p>
        <p>Use the 24-hour clock when creating time values.</p>
        <p>
          You can get hour, minute, second, and nanosecond values using getter
          methods.
        </p>
      </>
    ),
    code: `import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime time =
            LocalTime.of(14, 30, 15);

        System.out.println(time);
        System.out.println(time.getHour());
        System.out.println(time.getMinute());
        System.out.println(time.getSecond());

        LocalTime later =
            time.plusHours(2);

        System.out.println(later);
    }
}`,
  },
  {
    title: "7. LocalDateTime — Date and Time Together",
    content: (
      <>
        <p>
          <code>LocalDateTime</code> combines a date and time, but it does not
          contain a time zone or UTC offset.
        </p>
        <p>
          It is useful for values such as a local appointment time when the
          time zone is handled separately.
        </p>
      </>
    ),
    code: `import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDateTime meeting =
            LocalDateTime.of(
                2026, 12, 10, 10, 30
            );

        System.out.println(meeting);

        LocalDateTime tomorrow =
            meeting.plusDays(1);

        System.out.println(tomorrow);
    }
}`,
  },
  {
    title: "8. Parsing — String to Date or Time",
    content: (
      <>
        <p>
          Parsing means converting text into a date/time object.
        </p>
        <p>
          The default ISO formats can be parsed directly. For other formats,
          use a <code>DateTimeFormatter</code>.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LocalDate date =
            LocalDate.parse("2026-11-24");

        LocalTime time =
            LocalTime.parse("14:30:00");

        LocalDateTime dateTime =
            LocalDateTime.parse(
                "2026-11-24T14:30:00"
            );

        System.out.println(date);
        System.out.println(time);
        System.out.println(dateTime);
    }
}`,
  },
  {
    title: "9. DateTimeFormatter — Formatting",
    content: (
      <>
        <p>
          Formatting means converting a date/time object into a string in the
          format you want.
        </p>
        <p>Common pattern symbols:</p>
        <ul>
          <li><code>dd</code> — day of month</li>
          <li><code>MM</code> — month number</li>
          <li><code>MMM</code> — short month name</li>
          <li><code>MMMM</code> — full month name</li>
          <li><code>yyyy</code> — year-of-era</li>
          <li><code>HH</code> — hour in 24-hour format</li>
          <li><code>hh</code> — hour in 12-hour format</li>
          <li><code>mm</code> — minute</li>
          <li><code>ss</code> — second</li>
          <li><code>a</code> — AM/PM marker</li>
        </ul>
        <p>
          Be careful: <code>MM</code> means month, while <code>mm</code>{" "}
          means minute.
        </p>
      </>
    ),
    code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Main {
    public static void main(String[] args) {
        LocalDateTime now =
            LocalDateTime.now();

        DateTimeFormatter formatter =
            DateTimeFormatter.ofPattern(
                "dd-MM-yyyy HH:mm"
            );

        String result =
            now.format(formatter);

        System.out.println(result);
    }
}`,
  },
  {
    title: "10. Period — Difference Between Dates",
    content: (
      <>
        <p>
          <code>Period</code> represents a date-based amount in years, months,
          and days.
        </p>
        <p>
          Use it when you need calendar-based differences, such as a person's
          age or the time between two birthdays.
        </p>
        <p>
          The result is expressed in years, months, and days, not simply a
          total number of days.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate start =
            LocalDate.of(2007, 5, 20);

        LocalDate today =
            LocalDate.now();

        Period difference =
            Period.between(start, today);

        System.out.println(
            difference.getYears()
        );

        System.out.println(
            difference.getMonths()
        );

        System.out.println(
            difference.getDays()
        );
    }
}`,
  },
  {
    title: "11. Duration — Difference Between Times",
    content: (
      <>
        <p>
          <code>Duration</code> represents a time-based amount, commonly in
          seconds and nanoseconds.
        </p>
        <p>
          Use it for elapsed time, such as how long a task took or how much
          time passed between two timestamps.
        </p>
        <p>
          A duration of one day means 24 hours. It is not the same as a
          calendar day across a daylight-saving transition.
        </p>
      </>
    ),
    code: `import java.time.LocalTime;
import java.time.Duration;

public class Main {
    public static void main(String[] args) {
        LocalTime start =
            LocalTime.of(9, 0);

        LocalTime end =
            LocalTime.of(11, 30);

        Duration duration =
            Duration.between(start, end);

        System.out.println(
            duration.toHours()
        );

        System.out.println(
            duration.toMinutes()
        );
    }
}`,
  },
  {
    title: "12. Period vs Duration",
    content: (
      <>
        <p>Know this distinction for interviews:</p>
        <ul>
          <li>
            <code>Period</code> — date-based difference: years, months, days.
          </li>
          <li>
            <code>Duration</code> — time-based difference: seconds and
            nanoseconds.
          </li>
        </ul>
        <p>
          Example: calculating age uses <code>Period</code>. Measuring how long
          a program runs uses <code>Duration</code>.
        </p>
      </>
    ),
    code: `import java.time.*;

public class Main {
    public static void main(String[] args) {
        LocalDate date1 =
            LocalDate.of(2026, 1, 1);

        LocalDate date2 =
            LocalDate.of(2026, 3, 15);

        Period period =
            Period.between(date1, date2);

        System.out.println(period);

        LocalTime time1 =
            LocalTime.of(10, 0);

        LocalTime time2 =
            LocalTime.of(12, 30);

        Duration duration =
            Duration.between(time1, time2);

        System.out.println(duration);
    }
}`,
  },
  {
    title: "13. DayOfWeek and Month",
    content: (
      <>
        <p>
          Java provides enums for days of the week and months. This is safer
          and clearer than using arbitrary numbers.
        </p>
        <p>
          <code>getDayOfWeek()</code> returns a <code>DayOfWeek</code> value.
          <code> getMonth()</code> returns a <code>Month</code> value.
        </p>
      </>
    ),
    code: `import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.Month;

public class Main {
    public static void main(String[] args) {
        LocalDate date =
            LocalDate.of(2026, 11, 24);

        DayOfWeek day =
            date.getDayOfWeek();

        Month month =
            date.getMonth();

        System.out.println(day);
        System.out.println(month);
    }
}`,
  },
  {
    title: "14. Checking Date Conditions",
    content: (
      <>
        <p>Useful methods for comparing dates:</p>
        <ul>
          <li><code>isBefore()</code></li>
          <li><code>isAfter()</code></li>
          <li><code>isEqual()</code></li>
          <li><code>isLeapYear()</code></li>
          <li><code>lengthOfMonth()</code></li>
          <li><code>lengthOfYear()</code></li>
        </ul>
      </>
    ),
    code: `import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate date =
            LocalDate.of(2024, 2, 1);

        System.out.println(
            date.isLeapYear()
        );

        System.out.println(
            date.lengthOfMonth()
        );

        System.out.println(
            date.lengthOfYear()
        );
    }
}`,
  },
  {
    title: "15. ZoneId — Time Zones",
    content: (
      <>
        <p>
          A time zone identifies the rules used to convert between local time
          and the global timeline.
        </p>
        <p>
          Use region-based IDs such as <code>Asia/Kolkata</code> or{" "}
          <code>Europe/Paris</code>. These IDs include time-zone rules that can
          change over time.
        </p>
        <p>
          India uses the time zone <code>Asia/Kolkata</code>, which is UTC+05:30.
        </p>
      </>
    ),
    code: `import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {
    public static void main(String[] args) {
        ZoneId zone =
            ZoneId.of("Asia/Kolkata");

        ZonedDateTime indiaTime =
            ZonedDateTime.now(zone);

        System.out.println(indiaTime);
    }
}`,
  },
  {
    title: "16. ZonedDateTime",
    content: (
      <>
        <p>
          <code>ZonedDateTime</code> stores date, time, and a time zone.
        </p>
        <p>
          It is useful when an appointment must represent a real local time in
          a particular region.
        </p>
        <p>
          Unlike <code>LocalDateTime</code>, it can be converted to an
          unambiguous instant using its zone and the zone's rules.
        </p>
      </>
    ),
    code: `import java.time.*;

public class Main {
    public static void main(String[] args) {
        ZonedDateTime india =
            ZonedDateTime.now(
                ZoneId.of("Asia/Kolkata")
            );

        ZonedDateTime london =
            india.withZoneSameInstant(
                ZoneId.of("Europe/London")
            );

        System.out.println(india);
        System.out.println(london);
    }
}`,
  },
  {
    title: "17. Instant — A Point on the Timeline",
    content: (
      <>
        <p>
          <code>Instant</code> represents a point on the UTC timeline. It is
          useful for timestamps, logs, and storing event times.
        </p>
        <p>
          It does not represent a local calendar date by itself. Convert it to
          a time zone when you need human-readable local time.
        </p>
      </>
    ),
    code: `import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class Main {
    public static void main(String[] args) {
        Instant timestamp =
            Instant.now();

        ZonedDateTime local =
            timestamp.atZone(
                ZoneId.of("Asia/Kolkata")
            );

        System.out.println(timestamp);
        System.out.println(local);
    }
}`,
  },
  {
    title: "18. UTC, Offset, and Time Zone",
    content: (
      <>
        <p>These terms are related, but they are not identical.</p>
        <ul>
          <li>
            UTC — the reference time standard used for the global timeline.
          </li>
          <li>
            Offset — the difference from UTC at a particular moment, such as
            +05:30.
          </li>
          <li>
            Time zone — regional rules that determine offsets over time.
          </li>
        </ul>
        <p>
          A fixed offset does not contain all the historical and future rules
          of a region-based time zone.
        </p>
      </>
    ),
    code: `import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class Main {
    public static void main(String[] args) {
        OffsetDateTime time =
            OffsetDateTime.now(
                ZoneOffset.ofHoursMinutes(5, 30)
            );

        System.out.println(time);
    }
}`,
  },
  {
    title: "19. TemporalAdjusters",
    content: (
      <>
        <p>
          <code>TemporalAdjusters</code> provides ready-made rules for moving
          to useful calendar dates.
        </p>
        <ul>
          <li>First day of the month.</li>
          <li>Last day of the month.</li>
          <li>Next Monday.</li>
          <li>First Monday of the month.</li>
        </ul>
      </>
    ),
    code: `import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.time.DayOfWeek;

public class Main {
    public static void main(String[] args) {
        LocalDate today =
            LocalDate.now();

        LocalDate firstDay =
            today.with(
                TemporalAdjusters
                    .firstDayOfMonth()
            );

        LocalDate lastDay =
            today.with(
                TemporalAdjusters
                    .lastDayOfMonth()
            );

        LocalDate nextMonday =
            today.with(
                TemporalAdjusters
                    .next(DayOfWeek.MONDAY)
            );

        System.out.println(firstDay);
        System.out.println(lastDay);
        System.out.println(nextMonday);
    }
}`,
  },
  {
    title: "20. Clock — Making Time Testable",
    content: (
      <>
        <p>
          <code>Clock</code> lets a program obtain the current time from a
          controllable source.
        </p>
        <p>
          This is useful in testing. Instead of relying on the actual system
          clock, tests can use a fixed clock and produce predictable results.
        </p>
      </>
    ),
    code: `import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;

public class Main {
    public static void main(String[] args) {
        Clock fixedClock =
            Clock.fixed(
                Instant.parse(
                    "2026-01-01T00:00:00Z"
                ),
                ZoneId.of("UTC")
            );

        Instant now =
            Instant.now(fixedClock);

        System.out.println(now);
    }
}`,
  },
  {
    title: "21. Legacy Date Conversion",
    content: (
      <>
        <p>
          Older Java APIs may still appear in existing projects. You can
          convert between legacy <code>Date</code> and modern{" "}
          <code>Instant</code>.
        </p>
        <p>
          Prefer <code>java.time</code> for new code, and convert only at
          boundaries where legacy APIs are required.
        </p>
      </>
    ),
    code: `import java.util.Date;
import java.time.Instant;

public class Main {
    public static void main(String[] args) {
        Date oldDate = new Date();

        Instant instant =
            oldDate.toInstant();

        Date convertedBack =
            Date.from(instant);

        System.out.println(instant);
        System.out.println(convertedBack);
    }
}`,
  },
  {
    title: "22. Common Errors and Best Practices",
    content: (
      <>
        <ul>
          <li>
            Do not confuse <code>MM</code> (month) with <code>mm</code>{" "}
            (minute).
          </li>
          <li>
            Do not assume <code>LocalDateTime</code> contains a time zone.
          </li>
          <li>
            Do not use <code>Period</code> to measure elapsed seconds.
          </li>
          <li>
            Do not use <code>Duration</code> as a calendar age.
          </li>
          <li>
            Remember that date/time objects are immutable.
          </li>
          <li>
            Use region-based <code>ZoneId</code> for real-world time zones.
          </li>
          <li>
            Handle <code>DateTimeParseException</code> when parsing user input.
          </li>
          <li>
            Avoid hardcoding the system's current date in production logic.
          </li>
        </ul>
      </>
    ),
    code: `import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class Main {
    public static void main(String[] args) {
        try {
            LocalDate date =
                LocalDate.parse("2026-02-30");

            System.out.println(date);
        } catch (DateTimeParseException e) {
            System.out.println(
                "Invalid date format or value"
            );
        }
    }
}`,
  },
  {
    title: "23. Interview Questions",
    content: (
      <>
        <ol>
          <li>Why was java.time introduced in Java 8?</li>
          <li>What is the difference between LocalDate and LocalDateTime?</li>
          <li>Why are java.time objects immutable?</li>
          <li>What is the difference between Period and Duration?</li>
          <li>Does LocalDateTime store a time zone?</li>
          <li>What is the difference between Instant and ZonedDateTime?</li>
          <li>What is the difference between UTC offset and time zone?</li>
          <li>How do you parse and format date/time values?</li>
          <li>How do you calculate age using Period?</li>
          <li>How do you convert a legacy Date to Instant?</li>
        </ol>
      </>
    ),
    code: `// Practice: Calculate a person's age

import java.time.LocalDate;
import java.time.Period;

public class Main {
    public static void main(String[] args) {
        LocalDate birthDate =
            LocalDate.of(2007, 5, 20);

        LocalDate today =
            LocalDate.now();

        Period age =
            Period.between(
                birthDate,
                today
            );

        System.out.println(
            age.getYears() + " years, " +
            age.getMonths() + " months, " +
            age.getDays() + " days"
        );
    }
}`,
  },
];

export default function DateTimeLesson({ onBack }) {
  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid var(--border, #d1d5db)",
          background: "var(--card, #ffffff)",
          color: "var(--text, #111827)",
          cursor: "pointer",
        }}
      >
        ← Back to Java
      </button>

      <h1 style={{ fontSize: "30px", fontWeight: "800", marginBottom: "10px" }}>
        Java Date & Time API
      </h1>

      <p style={{ marginBottom: "24px", lineHeight: "1.7" }}>
        Learn how Java handles dates, times, formatting, durations, and time
        zones using the modern java.time API.
      </p>

      {lessons.map((lesson, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={headingStyle}>{lesson.title}</h2>
          <div style={{ lineHeight: "1.7", marginBottom: "14px" }}>
            {lesson.content}
          </div>
          <pre style={codeStyle}>
            <code>{lesson.code}</code>
          </pre>
        </section>
      ))}

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Final Checklist</h2>
        <ul>
          <li>Understand LocalDate, LocalTime, and LocalDateTime.</li>
          <li>Know how to parse and format dates.</li>
          <li>Know the difference between Period and Duration.</li>
          <li>Understand Instant, ZoneId, and ZonedDateTime.</li>
          <li>Practice calculating age and elapsed time.</li>
        </ul>
      </section>
    </div>
  );
}
